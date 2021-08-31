import {axiosHandler, IServerEvents} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export function httpPut<TRequest = any, TResponse = any>(
	href: string,
	data: TRequest,
	config?: AxiosRequestConfig,
): IServerEvents<TResponse> {
	return axiosHandler(config => axios.put<TResponse>(href, data, config), config);
}
