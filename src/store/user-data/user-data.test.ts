import { userInfoData, updateUserInfo } from './user-data';
import { makeFakeUserInfo } from '../../utils/mocks';

describe('Offers data slice', () => {
  it('should return initial state after empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      user: null,
    };
    const result = userInfoData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      user: null,
    };
    const result = userInfoData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update user info after updateUserInfo fulfilled', () => {
    const mockUserInfo = makeFakeUserInfo();
    const initialState = {
      user: null,
    };
    const expectedState = {
      user: mockUserInfo,
    };
    const result = userInfoData.reducer(initialState, updateUserInfo(mockUserInfo));

    expect(result).toEqual(expectedState);
  });
});
