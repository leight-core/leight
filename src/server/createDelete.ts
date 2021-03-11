import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {httpDelete} from "./httpDelete";
import {IDeleteCallback} from "./interface";

/**
 * Simple factory for creating `delete` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createDelete<TResponse = any>(link: string): IDeleteCallback<TResponse> {
	return (appContext: IAppContext, params?: Params) => httpDelete<TResponse>(appContext.link(link, params));
}
