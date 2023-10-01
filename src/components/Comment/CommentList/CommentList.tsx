import { Comment } from "models/Comment";

import CommentNote from "components/Comment/CommentNote/CommentNote";

import styles from "components/Comment/CommentList/CommentList.module.scss";

interface CommentListProps {
    comments: Comment[],
}

export default function CommentList({
    comments,
}: CommentListProps) {
    return <div className={styles.wrapper}>
        {comments.map(comment =>
            <CommentNote key={comment.id} comment={comment} />
        )}
    </div>
}