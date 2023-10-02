import { useState } from "react";

import { BUTTON } from "models/Interface";
import { Comment, isValidComment } from "models/Comment";

import styles from "components/Comment/CommentForm/CommentForm.module.scss";

interface CommentFormProps {
    comment?: Comment,
    sendForm: (comment: Comment) => void,
}

export default function CommentForm({
    comment,
    sendForm,
}: CommentFormProps) {
    const [value, setValue] = useState<string>(comment === undefined ? "" : comment.value);

    function handlerSendForm() {
        const newComment: Comment = {
            id: comment?.id || crypto.randomUUID(),
            value: value,
            subComments: comment?.subComments || []
        }
        if (!isValidComment(newComment)) {
            window.alert("Comment is empty. Please write something to send.")
            return;
        }

        sendForm(newComment);
        setValue("");
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            handlerSendForm();
        }
    };

    return <span className={styles.wrapper}>
        <span className={styles.comment}>
            <input className={styles.comment__content} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={handleKeyDown} />
            <button type="button" onClick={handlerSendForm}>{BUTTON.send}</button>
        </span>
    </span>
}