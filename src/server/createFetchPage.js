import Server from "./Server";

/**
 * @typedef {function} FetchPageCallbackType
 * @param {DiscoveryContextType} discovery DiscoveryContext to get page link from.
 * @param {number} page Selected page.
 * @param {number} limit Limit number of items on the page.
 * @param {Object.<String, *>} [params=null] Params from routing.
 * @param {EventsInstanceType} events Event handler.
 * @return {CancelTokenSource} cancel token from Axios
 */

/**
 * Simple factory for making HTTP post for paging over resource support.
 *
 * @param {string} link Discovery Index link id
 * @param {string} [param] Name of the parameter from Router being used for link generation (for example `/user/{id}/invoices`).
 *
 * @return {FetchPageCallbackType}
 */
const createFetchPage = (link, param = null) => {
	return (
		discovery,
		page,
		limit,
		params = null,
		events,
	) => Server.httpPost(
		discovery.page(link, param, params ? params[param] : null),
		{
			page,
			limit,
		},
		events,
	);
};

export default createFetchPage;
