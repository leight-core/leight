import {CloudDownloadOutlined} from "@ant-design/icons";
import {FC} from "react";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
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
			const events = httpGet<IClient>(href || "/client.json")
				.on("response", client => {
					appContext.setClient(client);
					stepLoaderContext.next();
				})
				.on("catch", () => {
					stepLoaderContext.setStatus("error");
				});
			return () => events.dismiss();
		}}/>
	);
};
