import {UserOutlined} from "@ant-design/icons";
import {FC} from "react";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {ServerEvents} from "../../server/ServerEvents";
import {useAppContext} from "../AppContext";

export interface ISessionStepProps {
	/**
	 * Discovery Index link id to fetch session from.
	 */
	link?: string
}

export const SessionStep: FC<ISessionStepProps> = ({link = "public.user.login", ...props}) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<UserOutlined/>} {...props} onStep={() => {
			const cancelToken = httpGet(
				appContext.link(link),
				ServerEvents()
					.on("response", session => {
						appContext.login(session);
						stepLoaderContext.next();
					})
					.on("http401", () => {
						/**
						 * 401 is OK here, because if we're on public, we'll get one when session is checked.
						 */
						stepLoaderContext.next();
					})
					.on("error", () => {
						stepLoaderContext.setStatus("error");
					})
			);
			return () => cancelToken.cancel();
		}}/>
	);
};
