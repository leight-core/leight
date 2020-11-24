import { Server } from "@leight-core/leight-js";
import { useEffect } from "react";

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
