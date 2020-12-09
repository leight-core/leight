import {IBlockContext} from "../block/interface";
import {IMenuContext} from "../menu/interface";

export interface ILayoutContext {
	/**
	 * Access to a layout-wide UI block context.
	 */
	blockContext: IBlockContext
	/**
	 * Access to a layout-wide (global) menu.
	 */
	menuContext: IMenuContext
	/**
	 * Is current layout switched to fullscreen mode (meant more like full-width mode).
	 */
	fullscreen: boolean
	/**
	 * SwitchItem current fullscreen flag by an Effect.
	 *
	 * @param enable
	 * @param restore
	 */
	useEnableFullscreen: (enable: boolean, restore: boolean) => void
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
