import { useState } from "react";

import { BUTTON } from "models/Interface";

import "components/General/Comment/CommentForm/CommentForm.scss";

interface CommentFormProps {
    closeForm: () => void,
    sendForm: (commentValue: string) => void,
}

export default function CommentForm({
    closeForm,
    sendForm
}: CommentFormProps) {
    const [value, setValue] = useState<string>("");

    return <form>
        <button onClick={closeForm}></button>
        <input value={value} onChange={(event) => setValue(event.target.value)}>{value}</input>
        <button onClick={() => sendForm(value)}>{BUTTON.send}</button>
    </form>
}