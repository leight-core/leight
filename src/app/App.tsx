import {AntDesignOutlined} from "@ant-design/icons";
import {Result} from "antd";
import {FC, Suspense, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {generatePath, Params} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {StepLoader} from "../loader/StepLoader";
import {RouterContext, RouterContextClass} from "../router/RouterContext";
import {httpDelete} from "../server/httpDelete";
import {IServerEvents} from "../server/interface";
import {Events} from "../utils/Events";
import {LoaderView} from "../view/LoaderView";
import {LockedUserView} from "../view/LockedUserView";
import {AppContext} from "./AppContext";
import {IClient, IDiscovery, ISites} from "./interface";
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
	 * Site map - when an user is authenticated, it's bound to the site he can use.
	 *
	 * Prop is {site: () => `<Component/>`}, for example {root: () => `<RootSite/>`}
	 */
	sites: ISites
	/**
	 * Optional icon shown when an application bootstraps.
	 */
	icon?: JSX.Element
}

/**
 * Common default Application:
 *
 * - uses server-side discovery by default
 * - uses server-side translations by default (with a setup of i18n)
 * - supports Session (with provided sites)
 */
export const App: FC<IAppProps> = (
	{
		titleTemplate,
		sites,
		clientHref = process.env.REACT_APP_CLIENT,
		icon,
	}) => {
	const {t} = useTranslation();
	const [title, setTitle] = useState<string>();
	const [client, setClient] = useState<IClient>();
	const [discovery, setDiscovery] = useState<IDiscovery>();
	const [session, setSession] = useState({
		site: "public",
	});
	const [ready, setReady] = useState<boolean>(false);
	const routerContext = new RouterContextClass();
	const link = (id: string, params ?: Params) => {
		if (!discovery) {
			throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery is not initialized yet!`);
		}
		if (!(discovery as Object)[id]) {
			throw new Error(`Cannot resolve link from Discovery for linkId [${id}]; discovery link does not exist.`);
		}
		/**
		 * A little replace hack to convert `/{foo}/bar` form into `/:foo/bar` form.
		 */
		const link = (discovery as Object)[id].link.replaceAll(/{(.*?)}/g, ":$1");
		params = {...routerContext.params, ...params};
		try {
			const url = new URL(link);
			url.pathname = generatePath(url.pathname, params);
			return url.href;
		} catch (e) {
			try {
				return generatePath(link, params);
			} catch (e) {
				console.error(`Cannot generate path for ${link} with params`, params);
				throw e;
			}
		}
	};
	const login = session => setSession(session);
	const logout = () => {
		setSession({
			site: "public",
		});
		const cancelToken = httpDelete(
			link("public.user.login"),
			// if we're already logged out, do nothing (as internal stuff could handle 401 errors)
			Events<IServerEvents>().on("http401", () => false),
		);
		return () => cancelToken.cancel();
	};
	return (
		<AppContext.Provider value={{
			setTitle,
			useTitle: title => {
				useEffect(() => {
					setTitle(t(title) as string);
				}, [title]);
			},
			client: client as IClient,
			setClient,
			discovery: discovery as IDiscovery,
			setDiscovery,
			session,
			link,
			login,
			logout,
			ready: () => setReady(true),
		}}>
			<RouterContext.Provider value={routerContext}>
				<BrowserRouter>
					<Helmet titleTemplate={titleTemplate} title={title}/>
					{ready ?
						<Suspense fallback={<LoaderView/>}>
							<>
								{sites[session.site] ? sites[session.site]() : <LockedUserView/>}
							</>
						</Suspense> :
						<Result icon={icon || <AntDesignOutlined/>}>
							<div style={{display: "flex", justifyContent: "center"}}>
								<StepLoader steps={[
									<InitialStep key={"initial"}/>,
									<ClientStep key={"client"} href={clientHref}/>,
									<DiscoveryStep key={"discovery"}/>,
									<TranslationStep key={"translation"}/>,
									<SessionStep key={"session"}/>,
									<FinishStep key={"finish"}/>,
								]}/>
							</div>
						</Result>
					}
				</BrowserRouter>
			</RouterContext.Provider>
		</AppContext.Provider>
	);
};
