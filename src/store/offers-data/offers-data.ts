import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { Offer } from '../../types';
import { replaceFavoriteOffer } from '../../utils';

export const initialState: OffersData = {
  offers: [],
  isLoading: false,
  hasError: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    updateOffers: (state, action: PayloadAction<Offer>) => {
      state.offers = replaceFavoriteOffer(state.offers, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const { updateOffers } = offersData.actions;
