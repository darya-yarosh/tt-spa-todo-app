import { Comment } from "models/Comment";

import styles from "components/Comment/CommentNote/CommentNote.module.scss";

interface CommentNoteProps {
    comment: Comment,
}

export default function CommentNote({
    comment,
}: CommentNoteProps) {
    return <span className={styles.wrapper}>
        <span className={styles.comment__value}>{comment.value}</span>
        {(comment.subComments.length !== 0) &&
            <span className={styles.subcomments}>
                {comment.subComments.map((subComment) =>
                    <CommentNote key={subComment.id} comment={subComment} />
                )}
            </span>
        }
    </span>
}