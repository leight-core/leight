import {ClientContextProvider, DayjsContextProvider, DiscoveryContextProvider, FingerprintContextProvider, I18NextProvider, LinkContextProvider, SessionContextProvider, TranslationLoader} from "@leight-core/leight";
import {i18n} from "i18next";
import {FC, ReactNode} from "react";
import {CookiesProvider} from "react-cookie";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

export interface IAppProps {
	logo?: ReactNode;
	/**
	 * Url from where a client get its configuration, for example "/client.json".
	 */
	clientLink: string;
	/**
	 * Optional href to obtain user ticket (user session) when app starts; defaults to "public.user.user-ticket".
	 */
	sessionLink?: string;
	translationLink?: string;
	queryClient: QueryClient;
	dayjs: any;
	i18next: i18n;
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
		clientLink,
		translationLink = "Edde.Shared.Translation",
		sessionLink = "Edde.Shared.User.Ticket",
		dayjs,
		i18next,
		queryClient,
		children,
	}) => {
	return <QueryClientProvider client={queryClient}>
		<DayjsContextProvider dayjs={dayjs}>
			<I18NextProvider i18next={i18next}>
				<LinkContextProvider>
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
				</LinkContextProvider>
			</I18NextProvider>
		</DayjsContextProvider>
		<ReactQueryDevtools initialIsOpen={false}/>
	</QueryClientProvider>;
};
