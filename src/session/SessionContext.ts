import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {ISession, ISessionContext} from "./interface";

export const SessionContext = createContext(null as unknown as ISessionContext<any>);

/**
 * Access to current user stuff and also methods controlling user's login/logout status.
 */
export const useSessionContext = <TSession extends ISession = ISession>(): ISessionContext<TSession> => useContext(SessionContext, "SessionContext");
