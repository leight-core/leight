import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {httpGet} from "./httpGet";
import {IGetCallback} from "./interface";

/**
 * Simple factory for creating `get` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createGet<TResponse = any>(link: string): IGetCallback<TResponse> {
	return (appContext: IAppContext, params?: Params) => httpGet<TResponse>(appContext.link(link, params));
}
