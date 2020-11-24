import { useEffect } from "react";
import { useDiscoveryContext } from "../discovery";
import { Server } from "../server";

const useTranslation = (events, link = "common.translation") => {
	const discoveryContext = useDiscoveryContext();
	useEffect(() => {
		const cancelToken = Server.httpGet(
			discoveryContext.link(link),
			events,
		);
		return () => cancelToken.cancel();
		// eslint-disable-next-line
	}, []);
};

export default useTranslation;
