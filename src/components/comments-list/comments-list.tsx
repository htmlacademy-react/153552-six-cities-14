import { Comment } from '../../types';
import CommentItem from '../comment-item/comment-item';

type CommentsListProps = {
  comments: Comment[];
}

export default function CommentsList({comments}: CommentsListProps): JSX.Element {
  return (
    <ul className="Comments__list">
      {comments.map((comment) => <CommentItem key={comment.id} comment={comment}/>)}
    </ul>
  );
}
