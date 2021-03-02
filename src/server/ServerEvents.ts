import {Events} from "../utils/Events";
import {IServerEvents} from "./interface";

export const ServerEvents = <TResponse = any>(): IServerEvents<TResponse> => Events();
