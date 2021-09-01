import {axiosHandler, IRequestEvents} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export function httpPatch<TRequest = any, TResponse = any>(
	href: string,
	data: TRequest,
	config?: AxiosRequestConfig
): IRequestEvents<TResponse> {
	return axiosHandler(config => axios.patch<TResponse>(href, data, config), config);
}
