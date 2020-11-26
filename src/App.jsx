import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { BrowserRouter } from "react-router-dom";
import Client from "./client/Client";
import Discovery from "./discovery/Discovery";
import Session from "./session/Session";
import Translation from "./translation/Translation";

/**
 * Common default Application:
 *
 * - uses server-side discovery by default (Client component)
 * - provides Discovery Index as a Context {@see useDiscoveryContext()}
 * - uses server-side translations by default (with a setup of i18n)
 * - supports Session (with provided sites)
 */
export const App = (
	{
		title,
		sites,
		client,
	}) => {
	return (
		<BrowserRouter>
			<Helmet titleTemplate={title}/>
			<Client href={client}>
				<Discovery>
					<Translation>
						<Session sites={sites}/>
					</Translation>
				</Discovery>
			</Client>
		</BrowserRouter>
	);
};

App.propTypes = {
	/**
	 * Page title using Helmet.
	 */
	title:  PropTypes.string.isRequired,
	/**
	 * Url from where a client get it's configuration, for example "/client.json".
	 */
	client: PropTypes.string,
	/**
	 * Site map - when an user is authenticated, it's bound to the site he can use.
	 *
	 * Prop is {site: <Component/>}, for example {root: <RootSite/>}
	 */
	sites:  PropTypes.any.isRequired,
};
