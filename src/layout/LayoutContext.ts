import {createContext} from "react";
import {useContext} from "../utils/useContext";

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
	 * Direct access to blocking state of the layout (**not a bool!**).
	 */
	blocking: number
	/**
	 * Tells if there is requested blocking state of the application.
	 */
	isBlocked: () => boolean
	/**
	 * Updates blocking state of the application; could be called more times as it maintains loader count.
	 */
	block: () => void
	/**
	 * Updates blocking state of the application; could be called more times as it maintains loader count.
	 */
	unblock: () => void
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
export const LayoutContext = createContext<ILayoutContext>(null as unknown as ILayoutContext);

/**
 * Access to the current Layout context.
 */
export const useLayoutContext = () => useContext<ILayoutContext>(LayoutContext, "LayoutContext");
