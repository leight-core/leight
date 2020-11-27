import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {BrowserRouter} from "react-router-dom";
import Client from "../client/Client";
import Discovery from "../discovery/Discovery";
import Session from "../session/Session";
import Translation from "../translation/Translation";
import {AppContext} from "./AppContext";

/**
 * Common default Application:
 *
 * - uses server-side discovery by default (Client component)
 * - provides Discovery Index as a Context {@link useDiscoveryContext}
 * - uses server-side translations by default (with a setup of i18n)
 * - supports Session (with provided sites)
 */
export const App = (
	{
		titleTemplate,
		sites,
		client,
	}) => {
	const {t} = useTranslation();
	const [title, setTitle] = useState();
	return (
		<AppContext.Provider value={{
			setTitle,
			useTitle: title => {
				useEffect(() => {
					setTitle(t(title));
				}, [title]);
			}
		}}>
			<BrowserRouter>
				<Helmet titleTemplate={titleTemplate} title={title}/>
				<Client href={client}>
					<Discovery>
						<Translation>
							<Session sites={sites}/>
						</Translation>
					</Discovery>
				</Client>
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
	client: PropTypes.string,
	/**
	 * Site map - when an user is authenticated, it's bound to the site he can use.
	 *
	 * Prop is {site: <Component/>}, for example {root: <RootSite/>}
	 */
	sites: PropTypes.any.isRequired,
};
