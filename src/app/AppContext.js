import {createContext, useContext} from "react";

/**
 * @typedef {function} useTitleType
 * @param {string} title
 */
/**
 * @typedef {function} setTitleType
 * @param {string} title
 */
/**
 * @typedef	{Object} ClientType
 * @property {string} discovery Discovery Index URL for this client.
 */
/**
 * @typedef {Object} DiscoveryLinkType
 * @property {string} link Link to the server, may contain parameters.
 * @property {string} [description] Description of the discovery link (for human).
 */
/**
 * @typedef {Object.<String, DiscoveryLinkType>} DiscoveryIndexType
 */
/**
 * @typedef {function} AppContextSetClientType
 * @param {ClientType} client
 */
/**
 * @typedef {function} AppContextSetDiscoveryType
 * @param {DiscoveryIndexType} discovery
 */

/**
 * @typedef {function} DiscoveryContextLinkType
 * @param {string} id Link name from the index; if does not exists, error is thrown.
 * @param {Object.<String, String>} [params=null] Replace the given parameters in url.
 * @return {string}
 */
/**
 * @typedef {Object} AppContextType
 * @property {useTitleType} setTitle Directly modify title state of the application.
 * @property {setTitleType} useTitle Change title as an effect; title goes through translation.
 * @property {ClientType} client Client configuration retrieved from the world.
 * @property {AppContextSetClientType} setClient Directly set client data.
 * @property {DiscoveryIndexType} discovery Access to discovery index.
 * @property {AppContextSetDiscoveryType} setDiscovery Set current discovery index.
 * @property {DiscoveryContextLinkType} link Requests a link from the Discovery; if does not exists, an error is thrown.
 * @property {function(session): void} login Open new session in the application; makes no http request as this is an internal login (with data whatever comes from).
 * @property {function(): void} logout Closes an application session (switches to public/non-session mode, clear all data); makes a delete request to user login in Discovery Index.
 * @property {*} session Direct access to current session data; usually set to a response from server on login (or default login with public user).
 * @property {function(): void} ready When called, application is switched to ready state (should be called once per full page load); everything needed for proper application run must be... ready!
 */

/**
 * Global application context; you should **not** access this directly.
 *
 * Use {@link useAppContext} instead.
 */
export const AppContext = createContext(null);

/**
 * Use the global application context (like title and so).
 *
 * @return {AppContextType}
 */
export const useAppContext = () => useContext(AppContext);
