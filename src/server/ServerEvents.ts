import {Events, IServerEvents} from "@leight-core/leight";

/**
 * Typed server event bus. Most common usage when doing any remote calls (internally using Axios).
 */
export const ServerEvents = <TResponse = any>(): IServerEvents<TResponse> => Events();

/**
 * In case where there is no real server request, but one is expecting some result, use this.
 */
export const FakeServerEvents = <TResponse = any>(data?: TResponse, timeout: number = 0): IServerEvents<TResponse> => {
	const events = ServerEvents();
	setTimeout(() => {
		events.handler("response")(data);
		events.handler("done")();
	}, timeout);
	return events;
};
