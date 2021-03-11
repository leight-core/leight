import {Events} from "../event/Events";
import {IUploaderEvents} from "./interface";

export const UploaderEvents = <TResponse = any>(): IUploaderEvents<TResponse> => Events();
