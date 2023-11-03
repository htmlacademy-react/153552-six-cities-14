import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { CityName } from '../../const';

export const getCity = (state: Pick<State, NameSpace.City>): CityName => state[NameSpace.City].city;
