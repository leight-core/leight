import httpPost from "./httpPost";

/**
 * @typedef {function} FetchPageCallbackType
 * @param {number} page Selected page.
 * @param {number} limit Limit number of items on the page.
 * @param {Object.<String, String>} [params=null] Params from routing.
 * @param {AppContextType} appContext DiscoveryContext to get page link from.
 * @param {EventsInstanceType} events Event handler.
 * @return {CancelTokenSource} cancel token from Axios
 */

/**
 * Simple factory for making HTTP post for paging over resource support.
 *
 * @param {string} link Discovery Index link id
 *
 * @return {FetchPageCallbackType}
 */
const createFetchPage = link => {
	return (
		page,
		limit,
		params = null,
		appContext,
		events,
	) => httpPost(
		appContext.link(link, params),
		{
			page,
			limit,
		},
		events,
	);
};

export default createFetchPage;
