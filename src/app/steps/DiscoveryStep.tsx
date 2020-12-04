import {CompassOutlined} from "@ant-design/icons";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {Events} from "../../utils/Events";
import {IDiscovery, useAppContext} from "../AppContext";

export const DiscoveryStep = (props) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<CompassOutlined/>} {...props} onStep={() => {
			const cancelToken = httpGet(
				appContext.client.discovery,
				Events()
					.on<IDiscovery>("success", discovery => {
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
