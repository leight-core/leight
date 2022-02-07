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
