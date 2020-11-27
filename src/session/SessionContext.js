import React, {useContext} from "react";

/**
 * @typedef {function} SessionContextOpenType
 * @param {*} session Session data usually got from the server.
 */
/**
 * @typedef {Object} SessionContextType
 * @property {*} session Session data got from the server on login.
 * @property {SessionContextOpenType} open Open new session/update current session.
 * @property {function} close Close current user's session (clears all data).
 */

/**
 * @type {React.Context<SessionContextType>}
 */
export const SessionContext = React.createContext(null);

/**
 * Use the global session context (thus current user's data).
 *
 * @return {SessionContextType}
 */
export const useSessionContext = () => useContext(SessionContext);
