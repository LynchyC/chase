export interface IFile {
    id: string;
    name: string;
    path: string;
    content: string;
}

export default interface IStoreState {
    files: IFile[];
}
