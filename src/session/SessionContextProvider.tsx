import {UserOutlined} from "@ant-design/icons";
import {LoaderLayout, SessionContext, useSessionTicketQuery} from "@leight-core/leight";
import {FC, PropsWithChildren, ReactNode} from "react";

export type ISessionContextProviderProps = PropsWithChildren<{
	logo?: ReactNode;
	/**
	 * Discovery Index link id to fetch session from.
	 */
	link: string | false;
}>

export const SessionContextProvider: FC<ISessionContextProviderProps> = (
	{
		logo,
		link,
		...props
	}) => {
	if (link === false) {
		return <>{props.children}</>;
	}
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
			{...props}
		/>
	</SessionContext.Provider>;
};
