import httpPost from "./httpPost";

/**
 * @typedef {function} CreatePostType
 * @param {*} data Data being sent to the server.
 * @param {AppContextType} discovery DiscoveryContext to get page link from.
 * @param {EventsInstanceType} events Event handler.
 * @return {CancelTokenSource} Axios cancel token
 */

/**
 * Simple factory for creating post based on the discovery link id.
 *
 * @param {string} link Discovery link id.
 * @return {CreatePostType}
 */
const createPost = link => {
	return (
		data,
		discovery,
		events,
	) => httpPost(
		discovery.link(link),
		data,
		events,
	);
};

export default createPost;
