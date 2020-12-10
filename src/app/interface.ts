import {Params} from "react-router";

export interface IDiscovery {
}

/**
 * Client configuration.
 */
export interface IClient {
	/**
	 * An URL where to download Discovery Index.
	 */
	discovery: string
}

/**
 * General stuff related to the application.
 */
export interface IAppContext<TSession = any> {
	/**
	 * Direct access to a client configuration.
	 */
	client: IClient
	/**
	 * Directly set Client configuration.
	 */
	setClient: (client: IClient) => void
	/**
	 * Direct access to a Discovery Index
	 */
	discovery: IDiscovery
	/**
	 * Directly set Discovery Index data.
	 */
	setDiscovery: (discovery: IDiscovery) => void
	/**
	 * Directly set the application title.
	 */
	setTitle: (title: string) => void
	/**
	 * Use an effect ot set the application title.
	 */
	useTitle: (title: string) => void
	/**
	 * Generate a link from current Discovery Index or throw an error.
	 */
	link: (id: string, params?: Params) => string
	/**
	 * Direct access to current session data; usually set to a response from server on login (or default login with public user).
	 */
	session: TSession
	/**
	 * Open new session in the application; makes no http request as this is an internal login (with data whatever comes from).
	 */
	login: (session: TSession) => void
	/**
	 * Closes an application session (switches to public/non-session mode, clear all data); makes a delete request to user login in Discovery Index.
	 */
	logout: () => () => void
	/**
	 * When called, application is switched to ready state (should be called once per full page load); everything needed for proper application run must be... ready!
	 */
	ready: () => void
}

export type ISites = { [key: string]: () => JSX.Element }
