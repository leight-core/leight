export interface IMenuElementContext {
	readonly element?: Element | null;
	setElement: (element?: Element | null) => void;
}

export interface IMenuSelectionContext {
	/**
	 * Currently selected menu items.
	 */
	readonly selection: string[];
	/**
	 * An effect to select menu item.
	 *
	 * @param select
	 */
	useSelection: (selection: string[]) => void;
}

export interface IMenuCollapseContext {
	/**
	 * Is menu collapsed (if applicable for the current layout).
	 */
	readonly collapsed: boolean;
	/**
	 * Hook for collapsing a menu.
	 */
	useCollapse: (collapsed: boolean, restore?: boolean) => void;
	/**
	 * Direct state change for menu collapse.
	 */
	setCollapsed: (collapsed: boolean) => void;
}
