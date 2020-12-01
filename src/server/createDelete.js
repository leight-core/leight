import httpDelete from "./httpDelete";

/**
 * @typedef {function} CreateDeleteType
 * @param {AppContextType} appContext DiscoveryContext to get page link from.
 * @param {EventsInstanceType} events Event handler.
 * @return {CancelTokenSource} Axios cancel token
 */

/**
 * Simple factory for creating delete based on the discovery link id.
 *
 * @param {string} link Discovery link id.
 * @return {CreateDeleteType}
 */
const createDelete = link => {
	return (
		appContext,
		events,
	) => httpDelete(
		appContext.link(link),
		events,
	);
};

export default createDelete;
