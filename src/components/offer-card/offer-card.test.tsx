import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeOffer } from '../../utils/mocks';
import OfferCard from './offer-card';

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const fakeOffer = makeFakeOffer();
    const fakeStore = makeFakeStore({});
    const { withStoreComponent } = withStore(withHistory(<OfferCard offer={fakeOffer} onToggleFavoriteOffer={() => {}} />), fakeStore);
    const offerCardId = 'offer__card__id';

    render(withStoreComponent);
    const listContainer = screen.getByTestId(offerCardId);

    expect(screen.getByText('Offer card')).toBeInTheDocument();
    expect(listContainer).toBeInTheDocument();
  });
});
