import {axiosHandler, IRequestEvents} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export function httpGet<TResponse = any>(
	href: string,
	config?: AxiosRequestConfig
): IRequestEvents<TResponse> {
	return axiosHandler(config => axios.get<TResponse>(href, config), config);
}
