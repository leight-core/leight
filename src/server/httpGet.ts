import axios, {AxiosRequestConfig} from "axios";
import {handler} from "./handler";
import {IServerEvents} from "./interface";

export function httpGet<TResponse = any>(
	href: string,
	config?: AxiosRequestConfig
): IServerEvents<TResponse> {
	return handler(config => axios.get<TResponse>(href, config), config);
}
