import {ReactNode} from "react";

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
	 * Current menu.
	 */
	readonly menu: ReactNode;
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
	/**
	 * Use the selected menu
	 *
	 * @param menu use the given menu
	 * @param name optional menu name used to prevent redraws when a same menu (by name) is used
	 */
	useMenu: (menu?: () => ReactNode, name?: string) => void;
	/**
	 * Directly set current menu.
	 *
	 * @param menu
	 */
	setMenu: (menu: ReactNode) => void;
}
