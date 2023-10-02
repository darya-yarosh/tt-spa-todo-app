import { Comment } from "models/Comment";

import CommentForm from "components/Comment/CommentForm/CommentForm";
import CommentExistingForm from "components/Comment/CommentExistingForm/CommentExistingForm";

import styles from "components/Comment/CommentListForm/CommentListForm.module.scss";

interface CommentListFormProps {
    comments: Comment[],
    updateComments: (comments: Comment[]) => void,
}

export default function CommentListForm({
    comments,
    updateComments
}: CommentListFormProps) {
    function handlerAddComment(commentValue: string) {
        const newComment: Comment = {
            id: crypto.randomUUID(),
            value: commentValue,
            subComments: []
        }

        const updatedComments = [...comments, newComment];
        updateComments(updatedComments)
    }

    function handlerUpdateComment(updatedComment: Comment) {
        const updatedCommentIndex = comments.findIndex(comment=>comment.id===updatedComment.id);
        const updatedComments = [...comments];
        
        updatedComments[updatedCommentIndex]=updatedComment;
        updateComments(updatedComments)
    }

    function handlerRemoveComment(commentId: string) {
        const updatedCommentIndex = comments.findIndex(comment=>comment.id===commentId);
        if (updatedCommentIndex === -1) {
            window.alert("The comment with the selected ID was not found.")
            return;
        }

        const updatedComments = [...comments];
        updatedComments.splice(updatedCommentIndex, 1);
        updateComments(updatedComments)
    }

    return <div className={styles.wrapper}>
        <div className={styles.commentsWrapper}>
        {comments.map(comment =>
            <CommentExistingForm key={comment.id} comment={comment} updateComment={handlerUpdateComment} removeComment={handlerRemoveComment}/>
        )}
        </div>
        {<CommentForm sendForm={handlerAddComment} />}
    </div>
}