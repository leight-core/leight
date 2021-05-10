import {Dispatch, SetStateAction} from "react";
import {generatePath, Params} from "react-router";
import {IParams} from "../interface/interface";
import {IDiscovery, IDiscoveryContext} from "./interface";

export class DiscoveryContextClass implements IDiscoveryContext {
	state: [IDiscovery | undefined, Dispatch<SetStateAction<IDiscovery | undefined>>];

	constructor(state: [IDiscovery | undefined, Dispatch<SetStateAction<IDiscovery | undefined>>]) {
		this.state = state;
	}

	public link(id: string, params: IParams | undefined): string {
		const [discovery] = this.state;

		if (!discovery) {
			throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery is not initialized yet!`);
		}
		if (!discovery[id]) {
			throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery link does not exist.`);
		}
		/**
		 * A little replace hack to convert `/{foo}/bar` form into `/:foo/bar` form.
		 */
		const link = discovery[id].link.replaceAll(/{(.*?)}/g, ":$1");
		try {
			const url = new URL(link);
			url.pathname = generatePath(url.pathname, params as Params);
			return url.href;
		} catch (e) {
			try {
				return generatePath(link, params as Params);
			} catch (e) {
				console.error(`Cannot generate path for ${link} with params`, params);
				throw e;
			}
		}
	}

	public setDiscovery(discovery: IDiscovery): void {
		this.state[1](discovery);
	}
}
