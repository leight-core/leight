import axios, {AxiosError, AxiosResponse} from "axios";
import {IServerEvents, IServerEventTypes} from "./interface";

/**
 * Handle axios error.
 */
export const axiosError = (error: AxiosError, events: IServerEvents) => {
	if (axios.isCancel(error)) {
		return;
	}
	if (error.response && error.response.status) {
		events.handler("http" + error.response.status as IServerEventTypes)(error.response.data);
	} else {
		events.handler("error")(error);
	}
	events.handler("catch")(error);
	events.handler("done")();
};

/**
 * Handle axios success.
 */
export const axiosSuccess = <TResponse = any>(axiosResponse: AxiosResponse<TResponse>, events: IServerEvents) => {
	events.handler("response")(axiosResponse.data);
	events.handler("done")();
};
