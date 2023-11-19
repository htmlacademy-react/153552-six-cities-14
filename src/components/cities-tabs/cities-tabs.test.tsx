import { random } from 'faker';
import { render, screen } from '@testing-library/react';
import CitiesTabs from './cities-tabs';
import { Cities } from '../../const';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: CitiesTabs', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const expectedText = random.arrayElement(Cities);
    const { withStoreComponent } = withStore(<CitiesTabs />, fakeStore);
    const listId = 'locations__list';

    render(withStoreComponent);
    const listContainer = screen.getByTestId(listId);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(listContainer).toBeInTheDocument();
  });
});
