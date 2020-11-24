import { Server } from "@leight-core/leight-js";
import { useEffect } from "react";

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
