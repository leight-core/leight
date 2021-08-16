import {CompassOutlined} from "@ant-design/icons";
import {FC} from "react";
import {useClientContext} from "../../client/ClientContext";
import {useDiscoveryContext} from "../../discovery/DiscoveryContext";
import {IDiscovery} from "../../discovery/interface";
import {ILoaderStepProps, LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";

export interface IDiscoveryStepProps extends Partial<ILoaderStepProps> {
}

export const DiscoveryStep: FC<IDiscoveryStepProps> = props => {
	const clientContext = useClientContext();
	const discoveryContext = useDiscoveryContext();
	const stepLoaderContext = useStepLoaderContext();
	return <LoaderStep
		icon={<CompassOutlined/>}
		onStep={() => {
			return httpGet<IDiscovery>(clientContext.client.discovery)
				.on("response", discovery => {
					discoveryContext.setDiscovery(discovery);
					stepLoaderContext.next();
				})
				.on("catch", e => {
					console.error(e);
					stepLoaderContext.setStatus("error");
				})
				.cleaner();
		}}
		{...props}
	/>;
};
