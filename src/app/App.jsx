import {AntDesignOutlined} from "@ant-design/icons";
import {Card, Result} from "antd";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {generatePath} from "react-router";
import {BrowserRouter} from "react-router-dom";
import StepLoader from "../loader/StepLoader";
import httpDelete from "../server/httpDelete";
import Events from "../utils/Events";
import LockedUserView from "../view/LockedUserView";
import {AppContext} from "./AppContext";
import ClientStep from "./steps/ClientStep";
import DiscoveryStep from "./steps/DiscoveryStep";
import FinishStep from "./steps/FinishStep";
import InitialStep from "./steps/InitialStep";
import SessionStep from "./steps/SessionStep";
import TranslationStep from "./steps/TranslationStep";

/**
 * Common default Application:
 *
 * - uses server-side discovery by default (Client component)
 * - uses server-side translations by default (with a setup of i18n)
 * - supports Session (with provided sites)
 */
export const App = (
	{
		titleTemplate,
		sites,
		clientHref,
	}) => {
	const {t} = useTranslation();
	const [title, setTitle] = useState();
	const [client, setClient] = useState();
	const [discovery, setDiscovery] = useState();
	const [session, setSession] = useState({
		site: "common",
	});
	const [ready, setReady] = useState(false);
	const link = (id, params = null) => {
		if (!discovery[id]) {
			throw new Error(`Cannot resolve link from Discovery for linkId [${id}]`);
		}
		/**
		 * A little replace hack to convert `/{foo}/bar` form into `/:foo/bar` form.
		 */
		return generatePath(discovery[id].link.replaceAll(/{(.*?)}/g, ":$1"), params);
	};
	const login = session => setSession(session);
	const logout = () => {
		setSession({
			site: "common",
		});
		const cancelToken = httpDelete(
			link(link),
			// if we're already logged out, do nothing (as internal stuff could handle 401 errors)
			Events().on("http-401", () => false),
		);
		return () => cancelToken.cancel();
	};
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
					<Result icon={<AntDesignOutlined/>}>
						<Card>
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
						</Card>
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
	 */
	clientHref: PropTypes.string,
	/**
	 * Site map - when an user is authenticated, it's bound to the site he can use.
	 *
	 * Prop is {site: <Component/>}, for example {root: <RootSite/>}
	 */
	sites: PropTypes.any.isRequired,
};
