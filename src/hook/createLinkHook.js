import { useEffect } from "react";
import { useDiscoveryContext } from "../discovery/DiscoveryContext";
import Server from "../server/Server";

const createLinkHook = link => {
	return (
		events,
	) => {
		const discoveryContext = useDiscoveryContext();
		useEffect(() => {
			events.call("request");
			const cancelToken = Server.httpGet(
				discoveryContext.link(link),
				events,
			);
			return () => cancelToken.cancel();
		}, []);
	};
};

export default createLinkHook;
