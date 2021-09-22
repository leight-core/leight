import {Events, IUploaderEvents} from "@leight-core/leight";

export const UploaderEvents = <TResponse = any>(): IUploaderEvents<TResponse> => Events();
