import {BrowserDetectionContext} from "@leight-core/leight";
import {FC} from "react";
import {isBrowser as isCoolBrowser, isMobile as isCoolMobile, isTablet as isCoolTablet} from "react-device-detect";

export interface IBrowserDetectionProviderProps {
	isBrowser?: () => boolean;
	isMobile?: () => boolean;
	isTablet?: () => boolean;
}

export const BrowserDetectionProvider: FC<IBrowserDetectionProviderProps> = ({isBrowser, isMobile, isTablet, ...props}) => {
	isBrowser = isBrowser || (() => isCoolBrowser || isCoolTablet);
	isMobile = isMobile || (() => isCoolMobile && !isCoolTablet);
	isTablet = isTablet || (() => isCoolTablet);
	return <BrowserDetectionContext.Provider
		value={{
			isBrowser,
			isMobile,
			isTablet,
		}}
		{...props}
	/>;
};
