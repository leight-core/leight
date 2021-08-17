import {UserOutlined} from "@ant-design/icons";
import {FC} from "react";
import {useDiscoveryContext} from "../../discovery/DiscoveryContext";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {IServerEvents} from "../../server/interface";
import {ServerEvents} from "../../server/ServerEvents";
import {ISession} from "../../session/interface";
import {useSessionContext} from "../../session/SessionContext";

export interface ISessionStepProps {
	/**
	 * Discovery Index link id to fetch session from.
	 */
	link?: string;
	/**
	 * Optional hook for session events.
	 */
	events?: IServerEvents;
}

export const SessionStep: FC<ISessionStepProps> = ({link = "session.ticket", events = ServerEvents(), ...props}) => {
	const discoveryContext = useDiscoveryContext();
	const sessionContext = useSessionContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep
			icon={<UserOutlined/>}
			{...props}
			onStep={() => httpGet<ISession>(discoveryContext.link(link))
				.on("response", session => {
					sessionContext.events.handler("ticket")(session);
					stepLoaderContext.next();
				})
				.on("http401", () => {
					/**
					 * 401 is OK here, because if we're on public, we'll get one when session is checked.
					 */
					stepLoaderContext.next();
				})
				.on("error", e => {
					console.error(e);
					stepLoaderContext.setStatus("error");
				})
				.chain(events)
				.cleaner()}
		/>
	);
};
