/**
 * Currently selected menu items, menu and other cool menu stuff.
 */
export interface IMenuContext {
	/**
	 * Currently selected menu items.
	 */
	current: string[]
	/**
	 * An effect to select menu item.
	 *
	 * @param select
	 */
	useSelect: (select: string[]) => void
	/**
	 * Current menu.
	 */
	menu: JSX.Element
	/**
	 * Use the selected menu
	 *
	 * @param menu use the given menu
	 * @param select optionally select item(s) of the menu
	 */
	useMenu: (menu: JSX.Element, select?: string[]) => void
}
