import {generatePath, Params} from "react-router";

export interface RouterIndex {
	[key: string]: string
}

export const Matches: RouterIndex = {};
export const Links: RouterIndex = {};

/**
 * Register a new route match or get route match by an id
 *
 * @param id
 * @param match
 */
export const match = (id: string, match: string = null): string => {
	if (match === null) {
		if (!Matches[id]) {
			throw new Error(`Requested unknown match with id [${id}]. Did you register it?`);
		}
		return Matches[id];
	}
	return Matches[id] = match;
};

/**
 * Register a new absolute link or retrieve one by an id; link is not generated, for parameter support use {@link generate}.
 */
export const link = (id: string, link: string = null): string => {
	if (link === null) {
		if (!Links[id]) {
			throw new Error(`Requested unknown link with id [${id}]. Did you register it?`);
		}
		return Links[id];
	}
	return Links[id] = link;
};

/**
 * Register a new route (both match and link).
 */
export const route = (id: string, route: string, href: string): void => {
	match(id, route);
	link(id, href);
};

/**
 * Generate link by the given link id.
 */
export const generate = (id: string, params: Params = null) => generatePath(link(id), params);
