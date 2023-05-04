import {validate} from 'class-validator';
import {getSession} from 'next-auth/react';

import initFirebaseAdmin from '../db/firebase-admin';
import {HTTPMethod} from './methods';
import {collection, query, where} from 'firebase/firestore';
import {permissionName} from '../types/permissions';
import {verifyAPIPermission} from '../utils/auth/auth';
export default class APIRouteHelper {
	constructor(req, res, permission) {
		this.req = req;
		this.res = res;
		this.permission = permission;
	}
	/**
	 * Map containing HTTP method name to funcitonallity entries
	 */
	methods = new Map();

	/**
	 * Holds method to class type for validation purposes.
	 * Each method in this map will validate to contain all whitelisted properties in their definition
	 *
	 * the second string value is the body key name for the object to validate
	 *
	 * For declaring validator decorators see:
	 * https://github.com/typestack/class-validator#usage
	 */
	validation = new Map();

	/**
	 * List to validate database existance
	 * of a document with id, given by queryKey in request query, in collection or throw 404 otherwise
	 */
	queryKeyMap = [];

	/**
	 * List to validate database existance
	 * of a document with id, given by queryKey in request query, in collection or throw 404 otherwise
	 */
	ownershipMap;

	/**
	 * Request parameters
	 */
	req;
	res;

	/**
	 * Contains the handler for the requesting method
	 */
	// apiRouteMethod: APIRoute | undefined;
	apiRouteMethod;

	/**
	 * Permission enum {@link permissionName} declaring permission group belonging
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
	permission;

	/**
	 * Solve a request with the corresponding HTTP
	 * method implementation, if any
	 *
	 * @returns Promise
	 */
	async handle() {
		return new Promise(async (resolve, reject) => {
			const method = this.req.method;

			if (method === HTTPMethod.OPTIONS) {
				// Handle OPTIONS Request
				this.res.status(200).setHeader('Allow', this.getAllowedMethods()).end();

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

	async onQueryKeySuccess(payload) {
		const hasOwnership = await this.verifyOwnership(payload);

		if (hasOwnership) {
			await this.onOwnerShipSuccess(payload);
		} else {
			this.res.status(403).end(`403 Unauthorized`);
		}
	}

	async onOwnerShipSuccess(payload) {
		const validatedBodyErrors = await this.validateRequestBody();

		if (validatedBodyErrors.length === 0) {
			try {
				await this.apiRouteMethod.handle(this.req, this.res, payload);
			} catch (err) {
				console.log(err);
				this.res.status(500).end(`Internal Error: ${err}`);
			}
		} else {
			this.res.status(400).json({errors: validatedBodyErrors});
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
	getAllowedMethods() {
		return Array.from(this.methods.keys());
	}

	/**
	 * Verifies that a matching document with an id retrieved using the query key exists in corresponding collection
	 *
	 * If found, converted document snapshot will be contained in method payload
	 *
	 * @returns payload IEntity (firestore models) object with converted documents, undefined if at least one document was not found
	 */
	async verifyQueryKeys(req) {
		let id;

		// Payload will contain queryKey to converted object entries
		const payload = new Map();

		for (let {queryKey, collection} of this.queryKeyMap) {
			id = req.query[queryKey];

			const dbCollection = collection(db, collection);
			const object = query(dbCollection, where('id', '==', id));

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
	async verifyOwnership(payload) {
		if (process.env.NODE_ENV === 'development') {
			return true;
		}

		const loggedUser = await getSession({req: this.req});

		for (let {queryKey, property} of this.ownershipMap) {
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
		const method = this.req.method;
		const isAllowedMethod =
			method === HTTPMethod.POST || method === HTTPMethod.PUT;

		if (isAllowedMethod) {
			if (this.validation.has(this.req.method)) {
				const [type, bodyKey] = this.validation.get(this.req.method);

				let instance = Object.assign(new type(), {
					...this.req.body[bodyKey],
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
	setMethod(method, apiRoute, validationType) {
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
	setQueryKey(queryKey, collection) {
		this.queryKeyMap.push({queryKey, collection});

		return this;
	}
}
