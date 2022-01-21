export interface IDrawerContext {
	/**
	 * Is the drawer visible?
	 */
	readonly visible: boolean;
	/**
	 * Set drawer's visibility.
	 *
	 * @param visible
	 */
	setVisible: (visible: boolean) => void;
}
