import {ICurrentUser, ISession, ISessionContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const SessionContext = createContext(null as unknown as ISessionContext<any>);

/**
 * Access to current user stuff and also methods controlling user's login/logout status.
 */
export const useSessionContext = <TSession extends ISession = ISession>(): ISessionContext<TSession> => useContext(SessionContext, "SessionContext");

/**
 * Requires current user by it's ID; if the user has no ID, an error is thrown.
 */
export const useCurrentUser = (): ICurrentUser => {
	const {user} = useSessionContext().session;
	if (!user.id) {
		throw new Error("There is no user ID in the user session.");
	}
	return user as ICurrentUser;
};
