import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthStatus } from '../../const';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.AuthorizationStatus>): AuthStatus => state[NameSpace.AuthorizationStatus].authorizationStatus;
export const getAuthCheckedStatus = (state: Pick<State, NameSpace.AuthorizationStatus>): boolean => state[NameSpace.AuthorizationStatus].authorizationStatus !== AuthStatus.Unknown;
