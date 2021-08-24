import {UserOutlined} from "@ant-design/icons";
import {httpPost, ISession, LoaderLayout, SessionContext, useDiscoveryContext, useFingerprintContext} from "@leight-core/leight";
import {FC, ReactNode, useEffect, useState} from "react";

export interface ISessionContextProviderProps<TSession extends ISession = ISession> {
	logo?: ReactNode;
	/**
	 * Discovery Index link id to fetch session from.
	 */
	link?: string;
}

export const SessionContextProvider: FC<ISessionContextProviderProps> = ({logo, link = "session.ticket", children}) => {
	const discoveryContext = useDiscoveryContext();
	const fingerprintContext = useFingerprintContext();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [session, setSession] = useState<ISession>({
		user: {
			site: "public",
			roles: [],
		},
	});

	useEffect(() => httpPost<{ hash: string }, ISession>(discoveryContext.link(link), {hash: fingerprintContext.fingerprint})
		.on("response", session => {
			setSession(session);
			setLoading(false);
		})
		.on("catch", e => {
			console.error(e);
			setError(true);
		})
		.cleaner(), []
	);

	return <SessionContext.Provider
		value={{
			session,
			setSession,
		}}
	>
		<LoaderLayout
			logo={logo}
			icon={<UserOutlined/>}
			loading={loading}
			error={error}
			errorText={"Session ticket failed."}
		>
			{children}
		</LoaderLayout>
	</SessionContext.Provider>;
};
