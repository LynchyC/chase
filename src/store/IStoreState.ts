export interface IFile {
    id: string;
    path: string;
    content: string;
}

export default interface IStoreState {
    files: IFile[];
}
