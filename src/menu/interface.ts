export interface IMenuContext {
	/**
	 * Currently selected menu items.
	 */
	readonly current: string[];
	/**
	 * An effect to select menu item.
	 *
	 * @param select
	 */
	useSelect: (select: string[]) => void;
	/**
	 * Is menu collapsed (if applicable for the current layout).
	 */
	readonly collapsed: boolean;
	/**
	 * Hook for collapsing a menu.
	 */
	useCollapse: (collapse: boolean, restore?: boolean) => void;
	/**
	 * Direct state change for menu collapse.
	 */
	setCollapse: (collapse: boolean) => void;
	readonly element?: Element | null;
	setElement: (element?: Element | null) => void;
}
