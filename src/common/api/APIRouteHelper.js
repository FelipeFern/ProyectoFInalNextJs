import { validate } from 'class-validator';
import {
	Constructor,
	getRepository,
	IEntity,
	IEntityConstructor
} from 'fireorm';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import initFirebaseAdmin from '../db/firebase-admin';
import { HTTPMethod } from '../types/HTTPMethod.type';
import { PermissionName } from '../types/PermissionName.type';
import { AuthUser } from '../types/types';
import { verifyAPIPermission } from '../utils/auth_auth/auth';
import { permissionName } from '../types/permissions';

/**
 * Defines the structure of an API Route handler
 * Forces the implementation of the RESTful API guideliness
 *
 * an async function that implements the route functionality
 *
 */
interface APIRoute {
	/**
	 * Route implementation for method
	 * @param req request
	 * @param res response
	 * @param payload content with converted documents matching id in collection if indicated
	 */
	handle(
		req: NextApiRequest,
		res: NextApiResponse,
		payload: Map<string, any>
	): Promise<void>;
}

/**
 * Helper class for API routes
 *
 * Handles:
 * 		- Authorization checks
 * 		- Method not allowed
 * 		- OPTIONS request
 * 		- Returning a promise
 * 		- Verification of existance for a document matching id in database, throwing 404 otherwise
 * 		- Model validation for incoming request body
 * 		- initialize firebase-admin if not already done
 *
 * See example of usage at '/pages/API/users.ts'
 *
 * Setting either methods or query keys can be done using builder pattern
 */

export default class APIRouteHelper {
	/**
	 * Map containing HTTP method name to funcitonallity entries
	 */
	methods: Map<HTTPMethod, APIRoute> = new Map();

	/**
	 * Holds method to class type for validation purposes.
	 * Each method in this map will validate to contain all whitelisted properties in their definition
	 *
	 * the second string value is the body key name for the object to validate
	 *
	 * For declaring validator decorators see:
	 * https://github.com/typestack/class-validator#usage
	 */
	validation: Map<HTTPMethod, [{ new (): any }, string]> = new Map();

	/**
	 * List to validate database existance
	 * of a document with id, given by queryKey in request query, in collection or throw 404 otherwise
	 */
	queryKeyMap: { queryKey: string; collection: IEntityConstructor }[] = [];

	/**
	 * List to validate database existance
	 * of a document with id, given by queryKey in request query, in collection or throw 404 otherwise
	 */
	ownershipMap: { queryKey: string; property: string | number | symbol }[] =
		[];

	/**
	 * Request parameters
	 */
	req: NextApiRequest;
	res: NextApiResponse<any>;

	/**
	 * Contains the handler for the requesting method
	 */
	apiRouteMethod: APIRoute | undefined;

	/**
	 * Permission enum {@link PermissionName} declaring permission group belonging
	 * so each http method checks with correponding action of the permission Group
	 *
	 * @example
	 * A route may have a permissionName = Roles
	 *
	 * Then a DELETE request to /api/roles/admin will verify the user has a
	 * role with permission equal to
	 *
	 * {
	 * 		id : 'Roles',
	 * 		action : 'DELETE',
	 * }
	 */
	permission: PermissionName;

	constructor(
		req,
		res,
		permission
	) {
		this.req = req;
		this.res = res;
		this.permission = permission;
	}

	/**
	 * Solve a request with the corresponding HTTP
	 * method implementation, if any
	 *
	 * @returns Promise
	 */
	async handle() {
		return new Promise<void>(async (resolve, reject) => {
			const method: HTTPMethod = <HTTPMethod>this.req.method;

			if (method === HTTPMethod.OPTIONS) {
				// Handle OPTIONS Request
				this.res
					.status(200)
					.setHeader('Allow', this.getAllowedMethods())
					.end();

				return resolve();
			}

			const apiRouteMethodAux = this.methods.get(method);

			if (apiRouteMethodAux) {
				this.apiRouteMethod = apiRouteMethodAux;
				await this.performPreCallLogic();
				await this.onMethodFound();
			} else {
				this.res
					.status(405)
					.setHeader('Allow', this.getAllowedMethods())
					.end(`Method ${method} Not Allowed`);
			}

			// Return a promise so NextJs can detect when work is done
			// https://github.com/vercel/next.js/issues/10439#issuecomment-583214126
			return resolve();
		});
	}

	async onMethodFound() {
		if (await verifyAPIPermission(this.req, this.permission)) {
			await this.onAccessPermitted();
		} else {
			this.res.status(403).end('403 Unauthorized');
		}
	}

	async onAccessPermitted() {
		const payload = await this.verifyQueryKeys(this.req);

		if (payload) {
			await this.onQueryKeySuccess(payload);
		} else {
			this.res.status(422).end(`422 query parameter not found`);
		}
	}

	async onQueryKeySuccess(payload: Map<string, any>) {
		const hasOwnership = await this.verifyOwnership(payload);

		if (hasOwnership) {
			await this.onOwnerShipSuccess(payload);
		} else {
			this.res.status(403).end(`403 Unauthorized`);
		}
	}

	async onOwnerShipSuccess(payload: Map<string, any>) {
		const validatedBodyErrors = await this.validateRequestBody();

		if (validatedBodyErrors.length === 0) {
			try {
				await this.apiRouteMethod!.handle(this.req, this.res, payload);
			} catch (err) {
				console.log(err);
				this.res.status(500).end(`Internal Error: ${err}`);
			}
		} else {
			this.res.status(400).json({ errors: validatedBodyErrors });
		}
	}

	/**
	 * Any logic regarding pre API method execution should be added to this method
	 */
	async performPreCallLogic() {
		initFirebaseAdmin();
	}

	/**
	 * Get the API route allowed methods
	 * @returns a string list containing the allowed API route methods
	 */
	getAllowedMethods(): HTTPMethod[] {
		return Array.from(this.methods.keys());
	}

	/**
	 * Verifies that a matching document with an id retrieved using the query key exists in corresponding collection
	 *
	 * If found, converted document snapshot will be contained in method payload
	 *
	 * @returns payload IEntity (firestore models) object with converted documents, undefined if at least one document was not found
	 */
	async verifyQueryKeys(
		req: NextApiRequest
	): Promise<Map<string, any> | undefined> {
		let id: string;

		// Payload will contain queryKey to converted object entries
		const payload: Map<string, any> = new Map();

		for (let { queryKey, collection } of this.queryKeyMap) {
			id = req.query[queryKey] as string;

			const repo = getRepository(collection);
			const object = await repo.findById(id);

			if (!object) {
				// Document w/matching id doesnt exist, returning undefined
				return undefined;
			}

			payload.set(queryKey, object);
		}

		return payload;
	}

	/**
	 * Verifies whether the objects retrieved verifyQueryKeys
	 * match their user property with requesting user, thus verifying ownership of the document
	 *
	 * @param payload payload containing retrieved documents
	 * @returns true if has ownership of all, false if at least one ownership check fails
	 */
	async verifyOwnership(payload: Map<string, any>): Promise<boolean> {
		if (process.env.NODE_ENV === 'development') {
			return true;
		}

		const loggedUser = (await getSession({ req: this.req }))
			?.user as AuthUser;

		for (let { queryKey, property } of this.ownershipMap) {
			const document = payload.get(queryKey);

			if (document[property] !== loggedUser.id) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Will perform json body for model validation if set for this
	 * method call
	 *
	 * @returns an array containing the validation errors.
	 */
	async validateRequestBody() {
		const method = <HTTPMethod>this.req.method;
		const isAllowedMethod =
			method === HTTPMethod.POST || method === HTTPMethod.PUT;

		if (isAllowedMethod) {
			if (this.validation.has(this.req.method! as HTTPMethod)) {
				const [type, bodyKey] = this.validation.get(
					this.req.method as HTTPMethod
				)!;

				let instance = Object.assign(new type(), {
					...this.req.body[bodyKey]
				});

				const errors = await validate(instance);

				return errors;
			}
		}
		return [];
	}

	/**
	 * Set a handler for a http method request
	 *
	 * Follows builder pattern
	 *
	 * @param method http method to handle
	 * @param apiRoute funcionality of the http method
	 * @param validationType add a class-validation decorated type for validation
	 *
	 * @returns APIRouteHelper for builderw pattern
	 */
	setMethod(
		method: HTTPMethod,
		apiRoute: APIRoute,
		validationType?: [{ new (): any }, string]
	) {
		this.methods.set(method, apiRoute);

		if (validationType) {
			this.validation.set(method, validationType);
		}

		return this;
	}

	/**
	 * Adds a query key to retrieve from query the id of the document that must exist in the given collection
	 * Responding with 404 status code if document wasnt found
	 *
	 * Follows builder pattern
	 *
	 * @param queryKey query key for the id
	 * @param collection to look the document from
	 */
	setQueryKey<T extends IEntity>(
		queryKey: string,
		collection: Constructor<T>
	) {
		this.queryKeyMap.push({ queryKey, collection });

		return this;
	}

	/**
	 * Same as @see {@link setQueryKey} but will check if the requesting user (the one in the session)
	 * has ownership of the document, comparing user's id with the document's property @param property
	 *
	 * @sample
	 * Lets say we need to make sure the requesting user is owner of a document it wants
	 * to perform a CRUD operation.
	 *
	 * Say we have a document Items = {id : string, ownerId: string, ...}
	 * Say the request is DELETE to /api/users/[id]/items/[itemId]
	 *
	 * then we would call .setQueryKeyWOwner('itemId', Items, 'ownerId')
	 *
	 * this would verify that the document with the id indicated via the url key 'itemId'
	 * in the 'Items' collection has the property 'ownerId' equals to requestingUser.id
	 *
	 * @param queryKey query key for the id
	 * @param collection to look the document from
	 * @param property requesting user id should be equals to the one in this property of the document
	 */
	setQueryKeyWOwner<T extends IEntity>(
		queryKey: string,
		collection: Constructor<T>,
		property: keyof T
	) {
		this.queryKeyMap.push({ queryKey, collection });
		this.ownershipMap.push({ queryKey, property });

		return this;
	}
}
