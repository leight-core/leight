import {Params} from "react-router";
import {IDiscoveryContext} from "../discovery/interface";
import {httpGet} from "./httpGet";
import {IGetCallback} from "./interface";

/**
 * Simple factory for creating `get` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createGet<TResponse = any>(link: string): IGetCallback<TResponse> {
	return (discoveryContext: IDiscoveryContext, params?: Params) => httpGet<TResponse>(discoveryContext.link(link, params));
}
