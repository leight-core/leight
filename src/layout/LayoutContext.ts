import {createContext, useContext} from "react";

export type IMenuSelector = string[];

export interface ILayoutContext {
	/**
	 * Is current layout switched to fullscreen mode (meant more like full-width mode).
	 */
	fullscreen: boolean
	/**
	 * Switch current fullscreen flag by an Effect.
	 *
	 * @param enable
	 * @param restore
	 */
	useEnableFullscreen: (enable: boolean, restore: boolean) => void
	/**
	 * Current selected menu item(s).
	 */
	selectMenu: IMenuSelector
	/**
	 * Select menu item using an Effect.
	 *
	 * @param select
	 */
	useMenuSelect: (select: IMenuSelector) => void
	/**
	 * Is the sider collapsed?
	 */
	collapsed: boolean
	/**
	 * Directly set collapsed state of the layout.
	 *
	 * @param collapsed
	 */
	setCollapsed: (collapsed: boolean) => void
	/**
	 * Direct access to loading state of the layout (**not a bool!**).
	 */
	loading: number
	/**
	 * Tells if there is requested loading state of the application.
	 */
	isLoading: () => boolean
	/**
	 * Updates loading state of the application; could be called more times as it maintains loader count.
	 */
	loadingStart: () => void
	/**
	 * Updates loading state of the application; could be called more times as it maintains loader count.
	 */
	loadingFinish: () => void
	/**
	 * Access to current arbitrary data on the layout; this is the place where some loaded piece of something could be hidden.
	 */
	data: any
	/**
	 * Direct access to state function setting arbitrary data on the layout.
	 *
	 * @param data
	 */
	setData: (data: any) => void
}

/**
 * Common Layout context; you should **not** use this directly, see {@link useLayoutContext}.
 */
export const LayoutContext = createContext<ILayoutContext>(null);

/**
 * Access to the current Layout context.
 */
export const useLayoutContext = () => useContext<ILayoutContext>(LayoutContext);
