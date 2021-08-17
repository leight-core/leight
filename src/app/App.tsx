import {ClientContextProvider, DiscoveryContextProvider, LinkContextProvider, SessionContextProvider, TranslationLoader} from "@leight-core/leight";
import {FC} from "react";

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
}

/**
 * Common default Application:
 *
 * - uses default server-side config loading (for discovery)
 * - uses server-side discovery by default
 * - uses server-side translations by default (with a setup of i18n)
 * - uses server-side default user login check
 */
export const App: FC<IAppProps> = (
	{
		clientHref = process.env.NEXT_PUBLIC_CLIENT,
		sessionLink,
		children,
	}) => {
	return <LinkContextProvider>
		<ClientContextProvider href={clientHref}>
			<DiscoveryContextProvider>
				<TranslationLoader>
					<SessionContextProvider link={sessionLink}>
						{children}
					</SessionContextProvider>
				</TranslationLoader>
			</DiscoveryContextProvider>
		</ClientContextProvider>
	</LinkContextProvider>;
};
