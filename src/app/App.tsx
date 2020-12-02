import {AntDesignOutlined} from "@ant-design/icons";
import {Result} from "antd";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {generatePath} from "react-router";
import {BrowserRouter} from "react-router-dom";
import StepLoader from "../loader/StepLoader";
import {httpDelete} from "../server/httpDelete";
import {Events} from "../utils/Events";
import {LockedUserView} from "../view/LockedUserView";
import {AppContext} from "./AppContext";
import {ClientStep} from "./steps/ClientStep";
import {DiscoveryStep} from "./steps/DiscoveryStep";
import {FinishStep} from "./steps/FinishStep";
import {InitialStep} from "./steps/InitialStep";
import {SessionStep} from "./steps/SessionStep";
import {TranslationStep} from "./steps/TranslationStep";

/**
 * Common default Application:
 *
 * - uses server-side discovery by default
 * - uses server-side translations by default (with a setup of i18n)
 * - supports Session (with provided sites)
 */
export const App = (
	{
		titleTemplate,
		sites,
		clientHref = process.env.REACT_APP_CLIENT,
		icon,
	}) => {
	const {t} = useTranslation();
	const [title, setTitle] = useState();
	const [client, setClient] = useState();
	const [discovery, setDiscovery] = useState();
	const [session, setSession] = useState({
		site: "public",
	});
	const [ready, setReady] = useState(false);
	const link = (id, params = null) => {
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
	const logout = () => {
		setSession({
			site: "public",
		});
		const cancelToken = httpDelete(
			link(link),
			// if we're already logged out, do nothing (as internal stuff could handle 401 errors)
			Events().on("http-401", () => false),
		);
		return () => cancelToken.cancel();
	};
	// @ts-ignore
	// @ts-ignore
	return (
		<AppContext.Provider value={{
			setTitle,
			useTitle: title => {
				useEffect(() => {
					setTitle(t(title));
				}, [title]);
			},
			client,
			setClient,
			discovery,
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
							{/*@ts-ignore*/}
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

App.propTypes = {
	/**
	 * Page title using Helmet.
	 */
	titleTemplate: PropTypes.string.isRequired,
	/**
	 * Url from where a client get it's configuration, for example "/client.json".
	 *
	 * Defaults to **`process.env.REACT_APP_CLIENT`**.
	 */
	clientHref: PropTypes.string,
	/**
	 * Site map - when an user is authenticated, it's bound to the site he can use.
	 *
	 * Prop is {site: `<Component/>`}, for example {root: `<RootSite/>`}
	 */
	sites: PropTypes.any.isRequired,
	/**
	 * Optional icon shown when an application bootstraps.
	 */
	icon: PropTypes.element,
};
