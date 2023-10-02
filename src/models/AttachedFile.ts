export interface AttachedFile {
    id: string,
    file: File,
}

export enum AttachedFileParameters {
    name = "Name",
    type = "Type",
    size = "Size",
    dateAdded = "Added",
    navigation = "Nav"
}