import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import Map from './map';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const mapId = 'map__id';

    render(<Map offers={[makeFakeOffer()]} activeOffer={makeFakeOffer()} type="city" />);
    const listContainer = screen.getByTestId(mapId);

    expect(listContainer).toBeInTheDocument();
  });
});
