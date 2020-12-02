import {CloudDownloadOutlined} from "@ant-design/icons";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {Events} from "../../utils/Events";
import {IClient, useAppContext} from "../AppContext";

export const ClientStep = ({href, ...props}) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<CloudDownloadOutlined/>} {...props} onStep={() => {
			const cancelToken = httpGet(
				href || "/client.json",
				Events()
					.on<IClient>("success", client => {
						appContext.setClient(client);
						stepLoaderContext.next();
					})
					.on("catch", () => {
						stepLoaderContext.setStatus("error");
					})
			);
			return () => cancelToken.cancel();
		}}/>
	);
};
