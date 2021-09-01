import {Events, IRequestEvents} from "@leight-core/leight";

/**
 * Typed server event bus. Most common usage when doing any remote calls (internally using Axios).
 */
export const RequestEvents = <TResponse = any>(): IRequestEvents<TResponse> => Events();

/**
 * In case where there is no real server request, but one is expecting some result, use this.
 */
export const FakeRequestEvents = <TResponse = any>(data?: TResponse, timeout: number = 0): IRequestEvents<TResponse> => {
	const events = RequestEvents();
	setTimeout(() => {
		events.handler("response")(data);
		events.handler("done")();
	}, timeout);
	return events;
};
