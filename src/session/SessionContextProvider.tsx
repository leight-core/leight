import {UserOutlined} from "@ant-design/icons";
import {ISession, LoaderLayout, SessionContext, useSessionTicketQuery} from "@leight-core/leight";
import {FC, ReactNode} from "react";

export interface ISessionContextProviderProps<TSession extends ISession = ISession> {
	logo?: ReactNode;
	/**
	 * Discovery Index link id to fetch session from.
	 */
	link?: string;
}

export const SessionContextProvider: FC<ISessionContextProviderProps> = (
	{
		logo,
		link = "session.ticket",
		children,
	}) => {
	const result = useSessionTicketQuery(link);
	return <SessionContext.Provider
		value={{
			session: result.data,
		}}
	>
		<LoaderLayout
			logo={logo}
			icon={<UserOutlined/>}
			queryResult={result}
			errorText={"Session ticket failed."}
		>
			{children}
		</LoaderLayout>
	</SessionContext.Provider>;
};
