import {IParams} from "../link/interface";

export interface IDiscoveryContext {
	/**
	 * Set current discovery index.
	 */
	setDiscovery: (discovery: IDiscovery) => void;
	/**
	 * Generate link from the given discovery index ID. Or throws an error if
	 * the ID does not exist.
	 */
	link: (id: string, params ?: IParams) => string;
}

export interface IDiscoveryItem {
	/**
	 * ID of this discovery item; should be simply rememberable.
	 */
	id: string;
	/**
	 * Link on the server side (thus discovery index id is an interface between the
	 * client application and remote application).
	 */
	link: string;
	/**
	 * Just an URL part of the link.
	 */
	url: string;
	/**
	 * Optional description of an endpoint.
	 */
	description: string | null;
}

export interface IDiscoveryIndex {
	[index: string]: IDiscoveryItem;
}

/**
 * Discovery index. Simple map of discovery index id and discovery item.
 */
export interface IDiscovery {
	index: IDiscoveryIndex;
}
