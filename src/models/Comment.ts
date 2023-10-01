export interface Comment {
    id: string,
    value: string,
    subComments: Comment[],
}