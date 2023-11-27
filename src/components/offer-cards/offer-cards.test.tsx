import { render, screen } from '@testing-library/react';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import OfferCards from './offer-cards';

describe('Component: OfferCards', () => {
  it('should render correctly', () => {
    const offerCardsId = 'cards__id';
    const fakeStore = makeFakeStore({});
    const { withStoreComponent } = withStore(withHistory(<OfferCards offers={[makeFakeOffer()]} onHandleFavoriteToggling={() => {}} cardType="city" />), fakeStore);


    render(withStoreComponent);
    const listContainer = screen.getByTestId(offerCardsId);

    expect(listContainer).toBeInTheDocument();
  });
});
