import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Cities } from '../../const';

export const getCity = (state: Pick<State, NameSpace.City>): keyof typeof Cities => state[NameSpace.City].city;
