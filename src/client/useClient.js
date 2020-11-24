import { useEffect } from "react";
import { Server } from "../server";

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
