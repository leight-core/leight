import {UploadFile} from "antd/lib/upload/interface";
import {IEventHandlers, IEventResult, IEvents} from "../event/interface";

export type IUploaderEventTypes = "uploading" | "error" | "done";

/**
 * Crazy thing this one: we override response from UploadFile to enforce user defined
 * type - in an UploadFile the response is optional (we don't want this).
 */
export interface IOnUploaderDone<TResponse> {
	(file: UploadFile<TResponse> & { response: TResponse }): IEventResult
}

export interface IUploaderEventHandlers<TResponse = any> extends IEventHandlers {
	uploading: (file: UploadFile) => IEventResult
	error: (file: UploadFile) => IEventResult
	done: IOnUploaderDone<TResponse>
}

export interface IUploaderEvents<TResponse = any> extends IEvents<IUploaderEventTypes, IUploaderEventHandlers<TResponse>> {
}
