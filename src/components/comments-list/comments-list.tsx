import { useMemo } from 'react';
import { Comment } from '../../types';
import { COMMENTS_MAX_QUANTITY } from '../../const';
import CommentItem from '../comment-item/comment-item';

type CommentsListProps = {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps): JSX.Element {
  const computedComments = useMemo(() => {
    const sortedComments = comments.sort((a: Comment, b: Comment) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

    return sortedComments.slice(0, COMMENTS_MAX_QUANTITY);
  }, [comments]);

  return (
    <>
      <div className="visually-hidden">Comments list</div>
      <ul className="Comments__list">
        {computedComments.map((comment) => <CommentItem key={comment.id} comment={comment}/>)}
      </ul>
    </>
  );
}
