import * as FileActions from "./fileActions";

type FileTypes = FileActions.IAddFileAction & FileActions.IUpdateFileAction & FileActions.IRemoveFileAction;

export default FileTypes;
