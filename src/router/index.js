import {generatePath} from "react-router";

export const Matches = {};
export const Links = {};

/**
 * Register a new route match or get route match by an id
 *
 * @param {string} id
 * @param {string} [match]
 *
 * @return {string}
 */
export const match = (id, match = null) => {
	if (match === null) {
		if (!Matches[id]) {
			throw new Error(`Requested unknown match with id [${id}]. Did you register it?`);
		}
		return Matches[id];
	}
	Matches[id] = match;
};

/**
 * Register a new absolute link or retrieve one by an id; link is not generated, for parameter support use {@link generate}.
 *
 * @param {string} id
 * @param {string} [link]
 *
 * @returns {string}
 */
export const link = (id, link = null) => {
	if (link === null) {
		if (!Links[id]) {
			throw new Error(`Requested unknown link with id [${id}]. Did you register it?`);
		}
		return Links[id];
	}
	Links[id] = link;
};

/**
 * Register a new route (both match and link).
 *
 * @param {string} id route id
 * @param {string} route match (goes to {@link match} method
 * @param {string} href link (goes to {@link link} method
 */
export const route = (id, route, href) => {
	match(id, route);
	link(id, href);
};

/**
 * Generate link by the given link id.
 *
 * @param {string} id
 * @param {Object} [params]
 * @returns {string}
 */
export const generate = (id, params = null) => generatePath(link(id), params);
