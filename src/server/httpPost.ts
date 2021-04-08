import axios, {AxiosRequestConfig} from "axios";
import {handler} from "./handler";
import {IServerEvents} from "./interface";

export function httpPost<TRequest = any, TResponse = any>(
	href: string,
	data: TRequest,
	config?: AxiosRequestConfig
): IServerEvents<TResponse> {
	return handler(config => axios.post<TResponse>(href, data, config), config);
}
