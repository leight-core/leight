import { useEffect } from "react";
import Server from "../server/Server";

/**
 * A hook for getting client-side application configuration.
 *
 * @param {Events} events Events object which could contain individual event handlers
 * @param {string} href Where to get a client config in case it's not on a standard place.
 */
const useClient = (
	events,
	href = "/client.json"
) => {
	useEffect(() => {
		const cancelToken = Server.httpGet(
			href,
			events,
		);
		return () => cancelToken.cancel();
		// eslint-disable-next-line
	}, [href]);
};

export default useClient;
