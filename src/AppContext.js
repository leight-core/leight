/**
 * @typedef {function} useTitle
 * @param {string} title
 */
/**
 * @typedef {function} setTitle
 * @param {string} title
 */
/**
 * @typedef {Object} AppContext
 * @property {setTitle} setTitle Directly modify title state of the application.
 * @property {useTitle} useTitle Change title as an effect.
 */

import React, { useContext } from "react";

/**
 * Global application context; you should **not** access this directly.
 *
 * Use {@link useAppContext} instead.
 */
export const AppContext = React.createContext(null);

/**
 * Use the global application context (like title and so).
 *
 * @return {AppContext}
 */
export const useAppContext = () => useContext(AppContext);
