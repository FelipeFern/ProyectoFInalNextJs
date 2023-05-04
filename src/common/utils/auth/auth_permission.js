import {HTTPMethod} from '../../api/methods';

export function hasPermission(user, permissionName, method) {
	if (!user) {
		return false;
	}

	if (hasRole(user, 'admin')) {
		return true;
	}

	const permissions = user.roles.some((role) => {
		let permissionMethods = role.permissions[permissionName];
		if (!permissionMethods) {
			return false;
		}
		return permissionMethods.indexOf(method) !== -1;
	});
}

export function verifyPagePermission(user, permissionName) {
	if (!user || !user.roles) {
		return false;
	}

	return hasPermission(user, permissionName, HTTPMethod.GET);
}

export function hasRole(user, roleId) {
	if (!user || !user.roles) {
		return false;
	}

	return user.roles.some((role) => role.id === roleId);
}
