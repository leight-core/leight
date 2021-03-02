import {CloudDownloadOutlined} from "@ant-design/icons";
import {FC} from "react";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {IServerEvents} from "../../server/interface";
import {Events} from "../../utils/Events";
import {useAppContext} from "../AppContext";
import {IClient} from "../interface";

export interface IClientStepProps {
	/**
	 * Where to get a client configuration (defaults to `/client.json`).
	 */
	href?: string
}

export const ClientStep: FC<IClientStepProps> = ({href, ...props}) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<CloudDownloadOutlined/>} {...props} onStep={() => {
			const cancelToken = httpGet(
				href || "/client.json",
				Events<IServerEvents<IClient>>()
					.on("success", client => {
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
