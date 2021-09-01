import {axiosHandler, IRequestEvents} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export function httpDelete<TResponse = any>(
	href: string,
	config?: AxiosRequestConfig,
): IRequestEvents<TResponse> {
	return axiosHandler(config => axios.delete<TResponse>(href, config), config);
}
