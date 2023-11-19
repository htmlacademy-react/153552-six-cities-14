import { render, screen } from '@testing-library/react';
import OfferFeatures from './offer-features';

describe('Component: OfferFeatures', () => {
  it('should render correctly', () => {
    render(<OfferFeatures features={['breakfast', 'swimming pool', 'good view']} />);

    expect(screen.getByText('Offer features')).toBeInTheDocument();
  });
});
