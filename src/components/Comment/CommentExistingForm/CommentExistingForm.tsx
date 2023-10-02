import { useState } from "react";

import { Comment } from "models/Comment";
import { BUTTON, MESSAGES } from "models/Interface";

import styles from "components/Comment/CommentExistingForm/CommentExistingForm.module.scss";

interface CommentExistingFormProps {
    comment: Comment;
    updateComment: (comment: Comment) => void;
    removeComment: (commentId: string) => void;
}

export default function CommentExistingForm({
    comment,
    updateComment,
    removeComment,
}: CommentExistingFormProps) {
    const [commentValue, setCommentValue] = useState<string>(comment.value);
    const [replyComment, setReplyComment] = useState<string>("");

    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
    const [isOpenReplyForm, setIsOpenReplyForm] = useState<boolean>(false);
    const [isRemovingComment, setIsRemovingComment] = useState<boolean>(false);

    const replyText = isOpenReplyForm ? BUTTON.cancel : BUTTON.reply;
    const editText = isOpenEditForm ? BUTTON.cancelEdit : BUTTON.edit;

    function toggleCommentReplyFormStatus() {
        setIsOpenReplyForm(currentValue => !currentValue);
    }

    function toggleCommentEditFormStatus() {
        setIsOpenEditForm(currentValue => !currentValue);
    }

    function saveEditingComment() {
        const updatedComment: Comment = { ...comment };
        updatedComment.value = commentValue;
        updateComment(updatedComment);
    }

    function toggleCommentRemoveNav() {
        setIsRemovingComment(currentValue => !currentValue);
    }

    function sendReplyComment() {
        const updatedComment: Comment = { ...comment };
        const newReplyComment: Comment = {
            id: crypto.randomUUID(),
            value: replyComment,
            subComments: [],
        }
        setReplyComment("");
        updatedComment.subComments.push(newReplyComment);
        updateComment(updatedComment);
        toggleCommentReplyFormStatus()
    }

    function removeSubcomment(subCommentId: string) {
        const subcommentIndex = comment.subComments.findIndex(subcomment => subcomment.id === subCommentId);
        if (subcommentIndex === -1) {
            window.alert("The subcomment with the selected ID was not found.")
            return;
        }

        const updatedComment: Comment = { ...comment };
        updatedComment.subComments = updatedComment.subComments.splice(subcommentIndex, 1);
        updateComment(updatedComment);
    }

    return <div className={styles.wrapper}>
        <section className={styles.comment}>
            {isOpenEditForm && <textarea className={styles.comment__content} value={commentValue} onChange={(event) => setCommentValue(event.target.value)} />}
            {!isOpenEditForm && <div className={styles.comment__content}>{comment.value}</div>}
            <div className={styles.comment__nav}>
                <button type="button" disabled={isOpenEditForm || isRemovingComment} onClick={toggleCommentRemoveNav}>{BUTTON.remove}</button>
                <button type="button" onClick={toggleCommentReplyFormStatus}>{replyText}</button>
                <button type="button" onClick={toggleCommentEditFormStatus}>{editText}</button>
                {isRemovingComment && <p className={styles.alert__text}>
                    <>
                        {MESSAGES.areYouSure}
                        <button onClick={toggleCommentRemoveNav}>{BUTTON.no}</button>
                        <button onClick={() => { removeComment(comment.id) }}>{BUTTON.yes}</button>
                    </>
                </p>}
                {isOpenEditForm && <button type="button" onClick={saveEditingComment}>Save</button>}
            </div>
        </section>
        <section className={styles.subcomments}>
            {isOpenReplyForm && <>{
                <section className={styles.comment}>
                    <input className={styles.comment__content} value={replyComment} onChange={(event) => setReplyComment(event.target.value)} />
                    <div className={styles.comment__nav}>
                        <button type="button" onClick={toggleCommentReplyFormStatus}>{BUTTON.close}</button>
                        <button type="button" onClick={sendReplyComment}>{BUTTON.send}</button>
                    </div>
                </section>
            }</>}
            {comment.subComments.map(subComment =>
                <CommentExistingForm key={subComment.id}
                    comment={subComment}
                    updateComment={updateComment}
                    removeComment={removeSubcomment} />
            )}
        </section>
    </div>
}