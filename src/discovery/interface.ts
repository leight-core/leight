import {IQueryParams} from "@leight-core/leight";

export interface IDiscoveryContext {
	/**
	 * Generate link from the given discovery index ID. Or throws an error if
	 * the ID does not exist.
	 */
	link(id: string, params ?: IQueryParams): string;
}

export interface IDiscoveryItem {
	/**
	 * ID of this discovery item; should be simply rememberable.
	 */
	readonly id: string;
	/**
	 * Link on the server side (thus discovery index id is an interface between the
	 * client application and remote application).
	 */
	readonly link: string;
	/**
	 * Just an URL part of the link.
	 */
	readonly url: string;
	/**
	 * Optional description of an endpoint.
	 */
	readonly description: string | null;
}

export interface IDiscoveryIndex {
	readonly [index: string]: IDiscoveryItem;
}

/**
 * Discovery index. Simple map of discovery index id and discovery item.
 */
export interface IDiscovery {
	readonly index: IDiscoveryIndex;
}
