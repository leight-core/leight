import {AntDesignOutlined} from "@ant-design/icons";
import {Result} from "antd";
import {FC, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {generatePath, Params} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {StepLoader} from "../loader/StepLoader";
import {httpDelete} from "../server/httpDelete";
import {Events} from "../utils/Events";
import {LockedUserView} from "../view/LockedUserView";
import {AppContext, IClient, IDiscovery} from "./AppContext";
import {ClientStep} from "./steps/ClientStep";
import {DiscoveryStep} from "./steps/DiscoveryStep";
import {FinishStep} from "./steps/FinishStep";
import {InitialStep} from "./steps/InitialStep";
import {SessionStep} from "./steps/SessionStep";
import {TranslationStep} from "./steps/TranslationStep";

export type ISites = { [key: string]: JSX.Element }

export interface IApp {
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
	 * Prop is {site: `<Component/>`}, for example {root: `<RootSite/>`}
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
export const App: FC<IApp> = (
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
		try {
			const url = new URL(link);
			url.pathname = generatePath(url.pathname, params);
			return url.href;
		} catch (e) {
			return generatePath(link, params);
			// swallowed exception - do not disturb in console
			// console.info(e);
		}
	};
	const login = session => setSession(session);
	const logout = (href?: string) => {
		setSession({
			site: "public",
		});
		if (href) {
			const cancelToken = httpDelete(
				link(href),
				// if we're already logged out, do nothing (as internal stuff could handle 401 errors)
				Events().on("http-401", () => false),
			);
			return () => cancelToken.cancel();
		}
		return () => null;
	};
	return (
		<AppContext.Provider value={{
			setTitle,
			useTitle: title => {
				useEffect(() => {
					setTitle(t(title));
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
			<BrowserRouter>
				<Helmet titleTemplate={titleTemplate} title={title}/>
				{ready ?
					(sites[session.site] || <LockedUserView/>) :
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
		</AppContext.Provider>
	);
};
