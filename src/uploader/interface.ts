import {UploadFile} from "antd/lib/upload/interface";
import {IEventHandler, IEventResult} from "../utils/interface";

export interface IUploaderEvents extends IEventHandler {
	uploading: (file: UploadFile) => IEventResult
	error: (file: UploadFile) => IEventResult
	done: (file: UploadFile) => IEventResult
}
