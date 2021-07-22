import {CompassOutlined} from "@ant-design/icons";
import {useClientContext} from "../../client/ClientContext";
import {useDiscoveryContext} from "../../discovery/DiscoveryContext";
import {IDiscovery} from "../../discovery/interface";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";

export const DiscoveryStep = (props) => {
	const clientContext = useClientContext();
	const discoveryContext = useDiscoveryContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<CompassOutlined/>} {...props} onStep={() => {
			const events = httpGet<IDiscovery>(clientContext.client.discovery)
				.on("response", discovery => {
					discoveryContext.setDiscovery(discovery);
					stepLoaderContext.next();
				})
				.on("catch", e => {
					console.error(e);
					stepLoaderContext.setStatus("error");
				});
			return () => events.dismiss();
		}}/>
	);
};
