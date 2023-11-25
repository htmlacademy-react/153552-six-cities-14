import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoritesData } from '../../types/state';
import { Offer } from '../../types';
import { fetchFavoritesAction, addFavoritesAction, removeFavoritesAction } from '../api-actions';

export const initialState: FavoritesData = {
  favoriteOffers: [],
  isLoading: false,
  hasError: false,
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    updateFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(addFavoritesAction.fulfilled, (state, action) => {
        state.favoriteOffers = [ ...state.favoriteOffers, action.payload];
        state.isLoading = false;
      })
      .addCase(addFavoritesAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(removeFavoritesAction.fulfilled, (state, action) => {
        const removingOfferIndex = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);
        state.favoriteOffers.splice(removingOfferIndex, 1);
      })
      .addCase(removeFavoritesAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

export const { updateFavoriteOffers } = favoritesData.actions;
