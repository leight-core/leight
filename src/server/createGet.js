import httpGet from "./httpGet";

/**
 * @typedef {function} CreatePostType
 * @param {AppContextType} discovery DiscoveryContext to get page link from.
 * @param {EventsInstanceType} events Event handler.
 * @return {CancelTokenSource} Axios cancel token
 */

/**
 * Simple factory for creating get based on the discovery link id.
 *
 * @param {string} link Discovery link id.
 * @return {CreatePostType}
 */
const createGet = link => {
	return (
		discovery,
		events,
	) => httpGet(
		discovery.link(link),
		events,
	);
};

export default createGet;
