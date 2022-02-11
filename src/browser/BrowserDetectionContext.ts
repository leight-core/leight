import {IBrowserDetectionContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const BrowserDetectionContext = createContext(null as unknown as IBrowserDetectionContext);

export const useBrowserDetectionContext = () => useContext(BrowserDetectionContext, "BrowserDetectionContext");

export const useIsMobile = () => useBrowserDetectionContext().isMobile();
export const useIsBrowser = () => useBrowserDetectionContext().isBrowser();
export const useIsTablet = () => useBrowserDetectionContext().isTablet();
