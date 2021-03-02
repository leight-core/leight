import axios, {AxiosError} from "axios";
import {IEvents} from "../utils/interface";
import {IServerEvents} from "./interface";

/**
 * Handle axios error.
 */
export const axiosError = (error: AxiosError, events: IEvents<IServerEvents>) => {
	if (axios.isCancel(error)) {
		return;
	}
	if (error.response && error.response.status) {
		events.handler("http" + error.response.status as keyof IServerEvents)(error.response.data);
	} else {
		events.handler("error")(error);
	}
	events.handler("catch")(error);
	events.handler("done")();
};

/**
 * Handle axios success.
 */
export const axiosSuccess = ({data}, events: IEvents<IServerEvents>) => {
	events.handler("success")(data);
	events.handler("done")();
};
