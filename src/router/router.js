import {generatePath} from "react-router";

export const Matches = {};
export const Links = {};

export const match = (id, match = null) => {
	if (match === null) {
		if (!Matches[id]) {
			throw new Error(`Requested unknown match with id [${id}]. Did you register it?`);
		}
		return Matches[id];
	}
	Matches[id] = match;
};

export const link = (id, link = null) => {
	if (link === null) {
		if (!Links[id]) {
			throw new Error(`Requested unknown link with id [${id}]. Did you register it?`);
		}
		return Links[id];
	}
	Links[id] = link;
};

export const generate = (id, params = null) => generatePath(link(id), params);
