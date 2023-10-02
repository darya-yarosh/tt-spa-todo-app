export interface Comment {
    id: string,
    value: string,
    subComments: Comment[],
}

export function isValidComment(comment: Comment) {
    const isCorrectValue = comment.value.trim().length > 0;
    return isCorrectValue;
}