import { Cities } from '../../const';
import { NameSpace } from '../../const';
import { getCity } from './selectors';

describe('City data selectors', () => {
  it('should return Paris', () => {
    const state = {
      [NameSpace.City]: {
        city: Cities[0],
      }
    };

    const result = getCity(state);

    expect(result).toBe(Cities[0]);
  });
});
