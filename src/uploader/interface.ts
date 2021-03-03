import {UploadFile} from "antd/lib/upload/interface";
import {IEventHandlers, IEventResult, IEvents} from "../event/interface";

export type IUploaderEventTypes = "uploading" | "error" | "done";

export interface IUploaderEventHandlers extends IEventHandlers {
	uploading: (file: UploadFile) => IEventResult
	error: (file: UploadFile) => IEventResult
	done: (file: UploadFile) => IEventResult
}

export interface IUploaderEvents extends IEvents<IUploaderEventTypes, IUploaderEventHandlers> {
}
