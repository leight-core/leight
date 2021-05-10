import {AntDesignOutlined} from "@ant-design/icons";
import {Result} from "antd";
import {FC, Suspense} from "react";
import {Helmet} from "react-helmet";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {ClientContextProvider} from "../client/ClientContextProvider";
import {DiscoveryContextProvider} from "../discovery/DiscoveryContextProvider";
import {StepLoader} from "../loader/StepLoader";
import {MenuProvider} from "../menu/MenuProvider";
import {ParamContextProvider} from "../param/ParamContextProvider";
import {RouterContextProvider} from "../router/RouterContextProvider";
import {useSessionContext} from "../session/SessionContext";
import {SessionContextProvider} from "../session/SessionContextProvider";
import {LoaderView} from "../view/LoaderView";
import {LockedUserView} from "../view/LockedUserView";
import {useAppContext} from "./AppContext";
import {AppContextProvider} from "./AppContextProvider";
import {ISites} from "./interface";
import {ClientStep} from "./steps/ClientStep";
import {DiscoveryStep} from "./steps/DiscoveryStep";
import {FinishStep} from "./steps/FinishStep";
import {InitialStep} from "./steps/InitialStep";
import {SessionStep} from "./steps/SessionStep";
import {TranslationStep} from "./steps/TranslationStep";

export interface IAppProps {
	/**
	 * Page title using Helmet.
	 */
	titleTemplate: string
	/**
	 * Url from where a client get it's configuration, for example "/client.json".
	 *
	 * Defaults to **`process.env.REACT_APP_CLIENT`**.
	 */
	clientHref?: string
	/**
	 * Optional href to obtain user ticket (user session) when app starts; defaults to "public.user.user-ticket".
	 */
	sessionHref?: string
	/**
	 * Site map - when an user is authenticated, it's bound to the site he can use.
	 *
	 * Prop is {site: () => `<Component/>`}, for example {root: () => `<RootSite/>`}
	 */
	sites: ISites
	/**
	 * Optional icon shown when an application bootstraps.
	 */
	icon?: JSX.Element
	/**
	 * Option to use HashRouter.
	 */
	useHashRouter?: boolean
}

const SiteSelector = ({sites}) => {
	const sessionContext = useSessionContext();
	return (
		sites[sessionContext.session.site] ? sites[sessionContext.session.site]() : <LockedUserView/>
	);
};

const RoutedInternal = ({icon, clientHref, sessionHref, sites, titleTemplate}) => {
	const appContext = useAppContext();
	return <>
		<Helmet titleTemplate={titleTemplate}/>
		{appContext.isReady ?
			<Suspense fallback={<LoaderView/>}>
				<SiteSelector sites={sites}/>
			</Suspense> :
			<Result icon={icon || <AntDesignOutlined/>}>
				<div style={{display: "flex", justifyContent: "center"}}>
					<StepLoader steps={[
						<InitialStep key={"initial"}/>,
						<ClientStep key={"client"} href={clientHref}/>,
						<DiscoveryStep key={"discovery"}/>,
						<TranslationStep key={"translation"}/>,
						<SessionStep key={"session"} link={sessionHref}/>,
						<FinishStep key={"finish"}/>,
					]}/>
				</div>
			</Result>
		}
	</>;
};

const AppInternal = (
	{
		titleTemplate,
		sites,
		clientHref = process.env.REACT_APP_CLIENT,
		sessionHref,
		icon,
		useHashRouter = false,
	}: IAppProps
) => {
	return (
		<RouterContextProvider>
			<ClientContextProvider>
				<DiscoveryContextProvider>
					<SessionContextProvider>
						<ParamContextProvider>
							<MenuProvider>
								{useHashRouter ? <HashRouter
									children={<RoutedInternal
										titleTemplate={titleTemplate}
										sites={sites}
										clientHref={clientHref}
										sessionHref={sessionHref}
										icon={icon}
									/>}/> : <BrowserRouter
									children={<RoutedInternal
										titleTemplate={titleTemplate}
										sites={sites}
										clientHref={clientHref}
										sessionHref={sessionHref}
										icon={icon}
									/>}/>}
							</MenuProvider>
						</ParamContextProvider>
					</SessionContextProvider>
				</DiscoveryContextProvider>
			</ClientContextProvider>
		</RouterContextProvider>
	);
};

/**
 * Common default Application:
 *
 * - uses server-side discovery by default
 * - uses server-side translations by default (with a setup of i18n)
 * - supports Session (with provided sites)
 */
export const App: FC<IAppProps> = (props) => {
	return (
		<AppContextProvider>
			<AppInternal {...props}/>
		</AppContextProvider>
	);
};
