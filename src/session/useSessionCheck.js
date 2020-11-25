import {useEffect} from "react";
import useDiscoveryContext from "../discovery/useDiscoveryContext";
import Server from "../server/Server";

const useSessionCheck = (events, link = "common.user.login") => {
	const discoveryContext = useDiscoveryContext();
	if (!discoveryContext) {
		throw new Error("Session works under DiscoveryContext (use for example Discovery component).");
	}
	useEffect(() => {
		const cancelToken = Server.httpGet(
			discoveryContext.link(link),
			events,
		);
		return () => cancelToken.cancel();
	}, []);
};

export default useSessionCheck;
