import { Comment } from "models/Task";

import CommentNote from "components/General/Comment/CommentNote/CommentNote";

import "components/General/Comment/CommentList/CommentList.scss";

interface CommentListProps {
    title: string,
    comments: Comment[],
}

export default function CommentList({
    comments,
}: CommentListProps) {
    return <div className="comment-list">
        {comments.map(comment =>
            <CommentNote comment={comment} />
        )}
    </div>
}