import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../utils/mocks';
import CommentsList from './comments-list';

describe('Component: CommentsList', () => {
  it('should render correctly', () => {
    const fakeComment = makeFakeComment();

    render(<CommentsList comments={[fakeComment]}/>);

    expect(screen.getByText('Comments list')).toBeInTheDocument();
  });
});
