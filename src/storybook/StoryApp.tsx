import React from "react";
import {AppContext} from "../app/AppContext";
import {DiscoveryContextProvider} from "../discovery/DiscoveryContextProvider";
import {LayoutContext} from "../layout/LayoutContext";
import {RouterContext} from "../router/RouterContext";
import {ViewContext} from "../view/ViewContext";

export const StoryApp = ({children}) => {
	return (
		<AppContext.Provider value={{appContext: true} as unknown as any}>
			<DiscoveryContextProvider>
				<RouterContext.Provider value={{
					useNavigate: () => null,
				} as unknown as any}>
					<LayoutContext.Provider value={{} as unknown as any}>
						<ViewContext.Provider value={{} as unknown as any}>
							{children}
						</ViewContext.Provider>
					</LayoutContext.Provider>
				</RouterContext.Provider>
			</DiscoveryContextProvider>
		</AppContext.Provider>
	);
};
