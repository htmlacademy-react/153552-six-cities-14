import { NameSpace } from '../../const';
import { getUserInfo } from './selectors';
import { makeFakeUserInfo } from '../../utils/mocks';

describe('Offers data selectors', () => {
  const mockUserInfo = makeFakeUserInfo();
  const state = {
    [NameSpace.User]: {
      user: mockUserInfo,
    }
  };

  it('should return favorite offers from store', () => {
    const { user } = state[NameSpace.User];
    const result = getUserInfo(state);

    expect(result).toEqual(user);
  });
});
