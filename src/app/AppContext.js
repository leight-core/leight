/**
 * @typedef {function} useTitleType
 * @param {string} title
 */
/**
 * @typedef {function} setTitleType
 * @param {string} title
 */
/**
 * @typedef {Object} AppContextType
 * @property {useTitleType} setTitle Directly modify title state of the application.
 * @property {setTitleType} useTitle Change title as an effect; title goes through translation.
 */

import React, {useContext} from "react";

/**
 * Global application context; you should **not** access this directly.
 *
 * Use {@link useAppContext} instead.
 */
export const AppContext = React.createContext(null);

/**
 * Use the global application context (like title and so).
 *
 * @return {AppContextType}
 */
export const useAppContext = () => useContext(AppContext);
