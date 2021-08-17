import {AntDesignOutlined} from "@ant-design/icons";
import {AppContextProvider, ClientContextProvider, DiscoveryContextProvider, IServerEvents, LinkContextProvider, LoadingPage, SessionContextProvider, TranslationLoader, useAppContext} from "@leight-core/leight";
import {Result} from "antd";
import {FC, ReactNode, Suspense} from "react";

export interface IAppProps {
	/**
	 * Url from where a client get it's configuration, for example "/client.json".
	 *
	 * Defaults to **`process.env.REACT_APP_CLIENT`**.
	 */
	clientHref?: string;
	/**
	 * Optional href to obtain user ticket (user session) when app starts; defaults to "public.user.user-ticket".
	 */
	sessionLink?: string;
	/**
	 * Optional icon shown when an application bootstraps.
	 */
	icon?: ReactNode;
	/**
	 * Optional hook for session (session ticket) events.
	 */
	sessionEvents?: IServerEvents;
}

const AppInternal: FC<IAppProps> = ({icon, children}) => {
	const appContext = useAppContext();
	return <>
		{appContext.isReady ?
			<Suspense fallback={<LoadingPage/>}>
				{children}
			</Suspense> :
			<Result icon={icon || <AntDesignOutlined/>}>
				<div style={{display: "flex", justifyContent: "center"}}>
					{children}
				</div>
			</Result>
		}
	</>;
};

/**
 * Common default Application:
 *
 * - uses server-side discovery by default
 * - uses server-side translations by default (with a setup of i18n)
 */
export const App: FC<IAppProps> = (
	{
		clientHref = process.env.NEXT_PUBLIC_CLIENT,
		sessionLink,
		sessionEvents,
		icon,
		children,
	}) => {
	return <AppContextProvider>
		<LinkContextProvider>
			<ClientContextProvider href={clientHref}>
				<DiscoveryContextProvider>
					<TranslationLoader>
						<SessionContextProvider link={sessionLink}>
							<AppInternal
								clientHref={clientHref}
								sessionLink={sessionLink}
								sessionEvents={sessionEvents}
								icon={icon}
								children={children}
							/>
						</SessionContextProvider>
					</TranslationLoader>
				</DiscoveryContextProvider>
			</ClientContextProvider>
		</LinkContextProvider>
	</AppContextProvider>;
};
