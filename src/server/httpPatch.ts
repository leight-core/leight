import axios, {AxiosRequestConfig} from "axios";
import {handler} from "./handler";
import {IServerEvents} from "./interface";

export function httpPatch<TRequest = any, TResponse = any>(
	href: string,
	data: TRequest,
	config?: AxiosRequestConfig
): IServerEvents<TResponse> {
	return handler(config => axios.patch<TResponse>(href, data, config), config);
}
