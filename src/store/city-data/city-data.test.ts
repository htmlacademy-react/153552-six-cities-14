import { cityData, updateCity } from './city-data';
import { cities } from '../../const';

describe('City data slice', () => {
  it('should return initial state after empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: cities[0] };
    const result = cityData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: cities[0] };
    const result = cityData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update state via updateCity', () => {
    const initialState = { city: cities[0] };
    const expectedState = { city: cities[4] };
    const result = cityData.reducer(initialState, updateCity(cities[4]));

    expect(result).toEqual(expectedState);
  });
});
