import {Events} from "../event/Events";
import {IServerEvents} from "./interface";

export const ServerEvents = <TResponse = any>(): IServerEvents<TResponse> => Events();
