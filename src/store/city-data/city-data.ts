import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { CityData } from '../../types/state';
import { Cities } from '../../const';

const initialState: CityData = {
  city: 'Paris',
};

export const cityData = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    updateCity: (state, action: PayloadAction<keyof typeof Cities>) => {
      state.city = action.payload;
    },
  },
});

export const { updateCity } = cityData.actions;
