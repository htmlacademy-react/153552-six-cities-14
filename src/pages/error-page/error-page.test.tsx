import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import ErrorPage from './error-page';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore({});
    const expectedMainText = '404 Not Found';
    const expectedLinkText = 'На главную';
    const { withStoreComponent } = withStore(withHistory(<ErrorPage />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
