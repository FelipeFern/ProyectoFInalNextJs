import {getSession} from 'next-auth/react';
import {hasPermission} from './auth_permission';

export async function verifyAPIPermission(req, permissionName) {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const session = await getSession({req});

  if (!session || !session.user) {
    return false;
  }

  let user = session.user;

  return hasPermission(user, permissionName, req.method);
}
