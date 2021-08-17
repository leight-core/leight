import {UserOutlined} from "@ant-design/icons";
import {httpGet, ISession, Loader, SessionContext, useDiscoveryContext} from "@leight-core/leight";
import {FC, useEffect, useState} from "react";

export interface ISessionContextProviderProps<TSession extends ISession = ISession> {
	/**
	 * Discovery Index link id to fetch session from.
	 */
	link?: string;
}

export const SessionContextProvider: FC<ISessionContextProviderProps> = ({link = "session.ticket", children}) => {
	const discoveryContext = useDiscoveryContext();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [session, setSession] = useState<ISession>({
		site: "public",
	});

	useEffect(() => httpGet<ISession>(discoveryContext.link(link))
		.on("response", session => {
			setSession(session);
			setLoading(false);
		})
		.on("http401", () => {
			/**
			 * 401 is OK here, because if we're on public, we'll get one when session is checked.
			 */
			setLoading(false);
		})
		.on("error", e => {
			console.error(e);
			setError(true);
		})
		.cleaner(), []
	);

	return <SessionContext.Provider
		value={{
			session,
		}}
	>
		<Loader
			icon={<UserOutlined/>}
			loading={loading}
			error={error}
			errorText={"Session ticket failed."}
		>
			{children}
		</Loader>
	</SessionContext.Provider>;
};
