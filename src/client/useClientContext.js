import {useContext} from "react";
import ClientContext from "./ClientContext";

/**
 * @typedef {*} ClientContextType
 */

/**
 * Access to current client context containing configuration of the client
 * application.
 *
 * @return {ClientContextType} Data in the context is the stuff directly returned by the server.
 */
export const useClientContext = () => useContext(ClientContext);
