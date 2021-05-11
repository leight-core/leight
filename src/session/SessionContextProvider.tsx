import {ReactNode, useState} from "react";
import {ISession} from "./interface";
import {SessionContext} from "./SessionContext";
import {SessionEvents} from "./SessionEvents";

export interface ISessionContextProviderProps<TSession extends ISession = ISession> {
	children: ReactNode
}

export const SessionContextProvider = <TSession extends ISession = ISession>({children}: ISessionContextProviderProps<TSession>) => {
	const [session, setSession] = useState<ISession>({
		site: "public",
	});
	return (
		<SessionContext.Provider
			value={{
				session,
				events: SessionEvents<TSession>()
					.on("ticket", session => setSession(session), 1000)
					.on("logout", () => setSession({
						site: "public",
					}), 1000)
			}}
			children={children}
		/>
	);
};
