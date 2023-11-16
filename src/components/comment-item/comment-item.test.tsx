import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../utils/mocks';
import CommentItem from './comment-item';

describe('Component: CommentItem', () => {
  it('should render correctly', () => {
    const fakeComment = makeFakeComment();

    render(<CommentItem comment={fakeComment}/>);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
