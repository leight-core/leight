import {axiosHandler, IServerEvents} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export function httpDelete<TResponse = any>(
	href: string,
	config?: AxiosRequestConfig,
): IServerEvents<TResponse> {
	return axiosHandler(config => axios.delete<TResponse>(href, config), config);
}
