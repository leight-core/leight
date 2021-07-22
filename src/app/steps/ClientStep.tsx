import {CloudDownloadOutlined} from "@ant-design/icons";
import {FC} from "react";
import {useClientContext} from "../../client/ClientContext";
import {IClient} from "../../client/interface";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";

export interface IClientStepProps {
	/**
	 * Where to get a client configuration (defaults to `/client.json`).
	 */
	href?: string;
}

export const ClientStep: FC<IClientStepProps> = ({href, ...props}) => {
	const clientContext = useClientContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<CloudDownloadOutlined/>} {...props} onStep={() => {
			return httpGet<IClient>(href || "/client.json")
				.on("response", client => {
					clientContext.setClient(client);
					stepLoaderContext.next();
				})
				.on("catch", e => {
					console.error(e);
					stepLoaderContext.setStatus("error");
				})
				.cleaner();
		}}/>
	);
};
