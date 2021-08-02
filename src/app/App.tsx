import {AntDesignOutlined} from "@ant-design/icons";
import {Result} from "antd";
import {FC, ReactNode, Suspense} from "react";
import {ClientContextProvider} from "../client/ClientContextProvider";
import {DiscoveryContextProvider} from "../discovery/DiscoveryContextProvider";
import {LinkContextProvider} from "../link/LinkContextProvider";
import {StepLoader} from "../loader/StepLoader";
import {LoadingPage} from "../page/LoadingPage";
import {IServerEvents} from "../server/interface";
import {SessionContextProvider} from "../session/SessionContextProvider";
import {useAppContext} from "./AppContext";
import {AppContextProvider} from "./AppContextProvider";
import {ClientStep} from "./steps/ClientStep";
import {DiscoveryStep} from "./steps/DiscoveryStep";
import {FinishStep} from "./steps/FinishStep";
import {InitialStep} from "./steps/InitialStep";
import {SessionStep} from "./steps/SessionStep";
import {TranslationStep} from "./steps/TranslationStep";

export interface IAppProps {
	/**
	 * Url from where a client get it's configuration, for example "/client.json".
	 *
	 * Defaults to **`process.env.REACT_APP_CLIENT`**.
	 */
	clientHref?: string;
	/**
	 * Optional href to obtain user ticket (user session) when app starts; defaults to "public.user.user-ticket".
	 */
	sessionHref?: string;
	/**
	 * Optional icon shown when an application bootstraps.
	 */
	icon?: ReactNode;
	/**
	 * Optional hook for session (session ticket) events.
	 */
	sessionEvents?: IServerEvents;
}

const AppInternal: FC<IAppProps> = ({icon, clientHref, sessionHref, sessionEvents, children}) => {
	const appContext = useAppContext();
	return <>
		{appContext.isReady ?
			<Suspense fallback={<LoadingPage/>}>
				{children}
			</Suspense> :
			<Result icon={icon || <AntDesignOutlined/>}>
				<div style={{display: "flex", justifyContent: "center"}}>
					<StepLoader steps={[
						<InitialStep key={"initial"}/>,
						<ClientStep key={"client"} href={clientHref}/>,
						<DiscoveryStep key={"discovery"}/>,
						<TranslationStep key={"translation"}/>,
						<SessionStep key={"session"} events={sessionEvents} link={sessionHref}/>,
						<FinishStep key={"finish"}/>,
					]}/>
				</div>
			</Result>
		}
	</>;
};

/**
 * Common default Application:
 *
 * - uses server-side discovery by default
 * - uses server-side translations by default (with a setup of i18n)
 */
export const App: FC<IAppProps> = (
	{
		clientHref = process.env.NEXT_PUBLIC_CLIENT,
		sessionHref,
		sessionEvents,
		icon,
		children,
	}) => {
	return <AppContextProvider>
		<LinkContextProvider>
			<ClientContextProvider>
				<DiscoveryContextProvider>
					<SessionContextProvider>
						<AppInternal
							clientHref={clientHref}
							sessionHref={sessionHref}
							sessionEvents={sessionEvents}
							icon={icon}
							children={children}
						/>
					</SessionContextProvider>
				</DiscoveryContextProvider>
			</ClientContextProvider>
		</LinkContextProvider>
	</AppContextProvider>;
};
