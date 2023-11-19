import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const { withStoreComponent } = withStore(withHistory(<Header />), fakeStore);
    const headerId = 'header__id';

    render(withStoreComponent);
    const listContainer = screen.getByTestId(headerId);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(listContainer).toBeInTheDocument();
  });
});
