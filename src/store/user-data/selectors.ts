import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserInfo } from '../../types/state';

export const getUserInfo = (state: Pick<State, NameSpace.User>): UserInfo | null => state[NameSpace.User].user;
