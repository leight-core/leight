import {CompassOutlined} from "@ant-design/icons";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {ServerEvents} from "../../server/ServerEvents";
import {useAppContext} from "../AppContext";
import {IDiscovery} from "../interface";

export const DiscoveryStep = (props) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<CompassOutlined/>} {...props} onStep={() => {
			const cancelToken = httpGet(
				appContext.client.discovery,
				ServerEvents<IDiscovery>()
					.on("response", discovery => {
						appContext.setDiscovery(discovery);
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
