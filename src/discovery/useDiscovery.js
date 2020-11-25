import {useEffect} from "react";
import Server from "../server/Server";

const useDiscovery = (
	href,
	events,
) => {
	useEffect(() => {
		const cancelToken = Server.httpGet(
			href,
			events,
		);
		return () => cancelToken.cancel();
	}, [href]);
};

export default useDiscovery;
