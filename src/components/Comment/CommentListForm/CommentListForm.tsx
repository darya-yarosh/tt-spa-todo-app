import { Comment } from "models/Comment";

import CommentForm from "components/Comment/CommentForm/CommentForm";
import CommentExistingForm from "components/Comment/CommentExistingForm/CommentExistingForm";

import styles from "components/Comment/CommentListForm/CommentListForm.module.scss";

interface CommentListFormProps {
    comments: Comment[],
    sendForm: (comments: Comment[]) => void,
}

export default function CommentListForm({
    comments,
    sendForm
}: CommentListFormProps) {
    function addComment(newComment: Comment) {
        const updatedComments = [...comments, newComment];
        sendForm(updatedComments)
    }

    function updateComment(updatedComment: Comment) {
        const updatedCommentIndex = comments.findIndex(comment => comment.id === updatedComment.id);
        const updatedComments = [...comments];

        updatedComments[updatedCommentIndex] = updatedComment;
        sendForm(updatedComments)
    }

    function removeComment(commentId: string) {
        const updatedCommentIndex = comments.findIndex(comment => comment.id === commentId);
        if (updatedCommentIndex === -1) {
            window.alert("The comment with the selected ID was not found.")
            return;
        }

        const updatedComments = [...comments];
        updatedComments.splice(updatedCommentIndex, 1);
        sendForm(updatedComments)
    }

    return <div className={styles.wrapper}>
        <div className={styles.commentsWrapper}>
            {comments.map(comment =>
                <CommentExistingForm key={comment.id} comment={comment} updateComment={updateComment} removeComment={removeComment} />
            )}
        </div>
        {<CommentForm sendForm={addComment} />}
    </div>
}