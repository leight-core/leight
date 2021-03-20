import {Params} from "react-router";
import {IDiscoveryContext} from "../discovery/interface";
import {httpDelete} from "./httpDelete";
import {IDeleteCallback} from "./interface";

/**
 * Simple factory for creating `delete` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createDelete<TResponse = any>(link: string): IDeleteCallback<TResponse> {
	return (discoveryContext: IDiscoveryContext, params?: Params) => httpDelete<TResponse>(discoveryContext.link(link, params));
}
