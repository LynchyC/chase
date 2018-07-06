export interface IFile {
    id: number;
    fileName: string;
    content: string;
}

export default interface IStoreState {
    files: IFile[];
}
