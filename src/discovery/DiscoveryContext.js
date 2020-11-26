import React, { useContext } from "react";

/**
 * @typedef {function} DiscoveryContextLinkType
 * @param {string} id Link name from the index; if does not exists, error is thrown.
 * @return {string}
 */
/**
 * @typedef {function} DiscoveryContextFetchType
 * @param {string} id Link name from the index; if does not exists, error is thrown.
 * @param {string} uuid When provided, uuid (or whatever identifier) will be present in resulted URL
 * @param {string} replace What piece of the link url should be replaced (usually {id} or whatever).
 * @return {string}
 */
/**
 * @typedef {function} DiscoveryContextPageType
 * @param {string} id Link name from the index.
 * @param {string} [name] Optional parameter name to be replaced in the target URL (without {}, for example just "user").
 * @param {string} [param] The value of replacement.
 */
/**
 * @typedef {Object} DiscoveryContextType
 * @property {DiscoveryContextLinkType} link Requests a link from the Discovery; if does not exists, an error is thrown.
 * @property {DiscoveryContextFetchType} fetch Prepare link with the given uuid; useful for fetching resource by identifier.
 * @property {DiscoveryContextPageType} page Basically same as the {@link DiscoveryContextType#fetch}, but it allows get just a simple link.
 */

/**
 * Global Server Discovery context holding contracts between client and server (basically
 * map between link name and it's url address).
 *
 * @type {React.Context<DiscoveryContextType>}
 */
export const DiscoveryContext = React.createContext(null);

/**
 * Access to global discovery context.
 *
 * @return {DiscoveryContextType}
 */
export const useDiscoveryContext = () => useContext(DiscoveryContext);
