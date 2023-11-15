import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CityData } from '../../types/state';
import { CityName } from '../../const';

const initialState: CityData = {
  city: 'Paris',
};

export const cityData = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    updateCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
  },
});

export const { updateCity } = cityData.actions;
