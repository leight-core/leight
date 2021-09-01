import {IRequestEvents, IRequestEventTypes} from "@leight-core/leight";
import axios, {AxiosError, AxiosResponse} from "axios";

/**
 * Handle axios error.
 */
export const axiosError = (error: AxiosError, events: IRequestEvents) => {
	if (axios.isCancel(error)) {
		return;
	}
	if (error.response && error.response.status) {
		events.handler("http" + error.response.status as IRequestEventTypes)(error.response.data);
	} else {
		events.handler("error")(error);
	}
	events.handler("catch")(error);
	events.handler("done")();
};

/**
 * Handle axios success.
 */
export const axiosSuccess = <TResponse = any>(axiosResponse: AxiosResponse<TResponse>, events: IRequestEvents) => {
	events.handler("response")(axiosResponse.data);
	events.handler("done")();
};
