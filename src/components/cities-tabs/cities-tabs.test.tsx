import { random } from 'faker';
import { render, screen } from '@testing-library/react';
import { cities } from '../../const';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import CitiesTabs from './cities-tabs';

describe('Component: CitiesTabs', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const expectedText = random.arrayElement(cities);
    const { withStoreComponent } = withStore(<CitiesTabs />, fakeStore);
    const listId = 'locations__list';

    render(withStoreComponent);
    const listContainer = screen.getByTestId(listId);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(listContainer).toBeInTheDocument();
  });
});
