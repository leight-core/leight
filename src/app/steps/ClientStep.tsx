import {CloudDownloadOutlined} from "@ant-design/icons";
import React, {FC} from "react";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {Events} from "../../utils/Events";
import {IClient, useAppContext} from "../AppContext";

export interface IClientStep {
	/**
	 * Where to get a client configuration (defaults to `/client.json`).
	 */
	href?: string
}

export const ClientStep: FC<IClientStep> = ({href, ...props}) => {
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
