export interface ILayoutContext {
	/**
	 * Is current layout switched to fullscreen mode (meant more like full-width mode).
	 */
	readonly fullwidth: boolean;

	/**
	 * SwitchItem current fullscreen flag by an Effect.
	 *
	 * @param enable
	 * @param restore
	 */
	useEnableFullwidth(enable: boolean, restore: boolean): void;
}

export interface ISiderCollapseContext {
	/**
	 * Is menu collapsed (if applicable for the current layout).
	 */
	readonly collapsed: boolean;

	/**
	 * Hook for collapsing a menu.
	 */
	useCollapse(collapsed?: boolean, restore?: boolean): void;

	/**
	 * Direct state change for menu collapse.
	 */
	setCollapsed(collapsed: boolean): void;
}
