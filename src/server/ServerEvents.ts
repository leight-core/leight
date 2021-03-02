import {Events} from "../utils/Events";
import {IServerEventHandlers, IServerEvents, IServerEventTypes} from "./interface";

export const ServerEvents = <TResponse = any>(): IServerEvents<TResponse> => {
	return Events<IServerEventTypes, IServerEventHandlers>();
};
