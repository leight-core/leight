import {Params} from "react-router";

export interface IDiscoveryContext {
	/**
	 * Set current discovery index.
	 */
	setDiscovery: (discovery: IDiscovery) => void
	/**
	 * Generate link from the given discovery index ID. Or throws an error if
	 * the ID does not exist.
	 *
	 * @param id
	 * @param params
	 */
	link: (id: string, params ?: Params) => string
}

export interface IIDiscoveryItem {
	/**
	 * Link on the server side (thus discovery index id is an interface between the
	 * client application and remote application).
	 */
	link: string
	/**
	 * Optional description of an endpoint.
	 */
	description: string | null
}

/**
 * Discovery index. Simple map of discovery index id and discovery item.
 */
export interface IDiscovery {
	[index: string]: IIDiscoveryItem
}
