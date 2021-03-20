import {IBlockContext} from "../block/interface";
import {IMenuContext} from "../menu/interface";

export interface ILayoutContext {
	/**
	 * Access to a layout-wide UI block context.
	 */
	readonly blockContext: IBlockContext
	/**
	 * Access to a layout-wide (global) menu.
	 */
	readonly menuContext: IMenuContext
	/**
	 * Is current layout switched to fullscreen mode (meant more like full-width mode).
	 */
	readonly fullscreen: boolean
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
	readonly collapsed: boolean
	/**
	 * Directly set collapsed state of the layout.
	 *
	 * @param collapsed
	 */
	setCollapsed: (collapsed: boolean) => void
}
