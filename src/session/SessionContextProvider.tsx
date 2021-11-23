import {UserOutlined} from "@ant-design/icons";
import {LoaderLayout, SessionContext, useSessionTicketQuery} from "@leight-core/leight";
import {FC, ReactNode} from "react";

export interface ISessionContextProviderProps {
	logo?: ReactNode;
	/**
	 * Discovery Index link id to fetch session from.
	 */
	link: string;
}

export const SessionContextProvider: FC<ISessionContextProviderProps> = (
	{
		logo,
		link,
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
