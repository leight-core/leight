import {ClientContextProvider, DiscoveryContextProvider, FingerprintContextProvider, LinkContextProvider, SessionContextProvider, TranslationLoader} from "@leight-core/leight";
import {FC, ReactNode} from "react";
import {CookiesProvider} from "react-cookie";

export interface IAppProps {
	logo?: ReactNode;
	/**
	 * Url from where a client get it's configuration, for example "/client.json".
	 *
	 * Defaults to **`process.env.REACT_APP_CLIENT`**.
	 */
	clientLink?: string;
	/**
	 * Optional href to obtain user ticket (user session) when app starts; defaults to "public.user.user-ticket".
	 */
	sessionLink?: string;
	translationLink?: string;
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
		logo,
		clientLink = process.env.NEXT_PUBLIC_CLIENT,
		translationLink,
		sessionLink,
		children,
	}) => {
	return <LinkContextProvider>
		<CookiesProvider>
			<FingerprintContextProvider logo={logo}>
				<ClientContextProvider link={clientLink} logo={logo}>
					<DiscoveryContextProvider logo={logo}>
						<TranslationLoader link={translationLink} logo={logo}>
							<SessionContextProvider link={sessionLink} logo={logo}>
								{children}
							</SessionContextProvider>
						</TranslationLoader>
					</DiscoveryContextProvider>
				</ClientContextProvider>
			</FingerprintContextProvider>
		</CookiesProvider>
	</LinkContextProvider>;
};
