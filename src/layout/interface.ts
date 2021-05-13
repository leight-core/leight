import {ReactNode} from "react";

export interface ILayoutContext {
	/**
	 * Is current layout switched to fullscreen mode (meant more like full-width mode).
	 */
	readonly fullwidth: boolean
	/**
	 * Width of the side menu (sider).
	 */
	readonly siderSize: number
	/**
	 * Set the width of the menu (sider).
	 */
	setSiderSize: (size: number) => void
	/**
	 * SwitchItem current fullscreen flag by an Effect.
	 *
	 * @param enable
	 * @param restore
	 */
	useEnableFullwidth: (enable: boolean, restore: boolean) => void
	/**
	 * Header used in "page" header (usually above a view).
	 */
	readonly pageHeader?: ReactNode
	/**
	 * Set/unset page header.
	 */
	setPageHeader: (header?: ReactNode) => void
}
