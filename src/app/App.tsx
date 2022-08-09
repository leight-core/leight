import {
	BrowserDetectionContext,
	BrowserDetectionProvider,
	DayjsProvider,
	FingerprintProvider,
	I18NextProvider,
	IBrowserDetectionProviderProps,
	LayoutBlockProvider,
	LinkContextProvider,
	MenuElementProvider,
	MenuSelectionProvider,
	SessionContextProvider,
	SiderCollapseProvider,
	TranslationLoader
} from "@leight-core/leight";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {i18n} from "i18next";
import {FC, PropsWithChildren, ReactNode} from "react";
import {CookiesProvider} from "react-cookie";

export type IAppProps = PropsWithChildren<{
	logo?: ReactNode;
	/**
	 * Optional href to obtain user ticket (user session) when app starts; defaults to "public.user.user-ticket".
	 */
	sessionLink?: string | false;
	translationLink?: string;
	queryClient: QueryClient;
	dayjs: any;
	i18next: i18n;
	defaultCollapsed?: boolean;
	browserDetectionProps?: IBrowserDetectionProviderProps;
}>

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
		translationLink = "/api/shared/translation",
		sessionLink = "/api/shared/user/ticket",
		dayjs,
		i18next,
		queryClient,
		browserDetectionProps,
		defaultCollapsed,
		children,
	}) => {
	return <QueryClientProvider client={queryClient}>
		<BrowserDetectionProvider {...browserDetectionProps}>
			<DayjsProvider dayjs={dayjs}>
				<I18NextProvider i18next={i18next}>
					<LinkContextProvider>
						<CookiesProvider>
							<FingerprintProvider logo={logo}>
								<TranslationLoader link={translationLink} logo={logo}>
									<SessionContextProvider link={sessionLink} logo={logo}>
										<BrowserDetectionContext.Consumer>
											{browserContext => <SiderCollapseProvider defaultCollapsed={defaultCollapsed !== undefined ? defaultCollapsed : !browserContext.isMobile()}>
												<MenuSelectionProvider>
													<MenuElementProvider>
														<LayoutBlockProvider>
															{children}
														</LayoutBlockProvider>
													</MenuElementProvider>
												</MenuSelectionProvider>
											</SiderCollapseProvider>}
										</BrowserDetectionContext.Consumer>
									</SessionContextProvider>
								</TranslationLoader>
							</FingerprintProvider>
						</CookiesProvider>
					</LinkContextProvider>
				</I18NextProvider>
			</DayjsProvider>
		</BrowserDetectionProvider>
	</QueryClientProvider>;
};
