import Server from "./Server";

/**
 * @typedef {function} CreatePostType
 * @param {DiscoveryContextType} discovery DiscoveryContext to get page link from.
 * @param {*} data Data being sent to the server.
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
		discovery,
		data,
		events,
	) => Server.httpPost(
		discovery.link(link),
		data,
		events,
	);
};

export default createPost;
