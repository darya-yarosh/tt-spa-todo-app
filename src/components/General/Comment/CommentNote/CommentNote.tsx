import { useState } from "react";

import { Comment } from "models/Task";
import { BUTTON } from "models/Interface";

import CommentForm from "components/General/Comment/CommentForm/CommentForm";

import "components/General/Comment/CommentNote/CommentNote.scss";

interface CommentNoteProps {
    comment: Comment,
}

export default function CommentNote({
    comment,
}: CommentNoteProps) {
    const [isOpenReplyComment, setIsOpenReplyComment] = useState<Boolean>(false);

    function handeCloseReplyComment() {
        setIsOpenReplyComment(value => !value)
    }

    function handleSendReplyComment(commentValue: string) {
        const replyedComment: Comment = {
            id: crypto.randomUUID(),
            value: commentValue,
            subComments: []
        }

        const updatedSubComments: Comment[] = [...comment.subComments, replyedComment];
        const updatedComment: Comment = {
            id: comment.id,
            value: comment.value,
            subComments: updatedSubComments
        }

        comment = updatedComment;
    }

    return <span key={comment.id}>
        <button>{BUTTON.delete}</button>
        <span className="comment-value">{comment.value}</span>
        {(comment.subComments.length !== 0) &&
            <span className="subcomment-list">
                {comment.subComments.map((subComment) =>
                    <CommentNote comment={subComment} />
                )}
            </span>
        }
        <button>{BUTTON.reply}</button>
        {isOpenReplyComment && <CommentForm closeForm={handeCloseReplyComment} sendForm={handleSendReplyComment} />}
    </span>
}