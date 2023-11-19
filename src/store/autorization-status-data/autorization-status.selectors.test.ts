import { NameSpace } from '../../const';
import { AuthStatus } from '../../const';
import { getAuthorizationStatus, getAuthCheckedStatus } from './selectors';

describe('Authorization status selectors', () => {
  const state = {
    [NameSpace.AuthorizationStatus]: {
      authorizationStatus: AuthStatus.Auth,
    }
  };

  const { authorizationStatus } = state[NameSpace.AuthorizationStatus];

  it('should return authorization status from store', () => {
    const result = getAuthorizationStatus(state);

    expect(result).toEqual(authorizationStatus);
  });

  it('should return if status is not unknown', () => {
    const result = getAuthCheckedStatus(state);

    expect(result).toBe(true);
  });
});
