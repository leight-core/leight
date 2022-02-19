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
	setVisible(visible: boolean): void;

	hide(): void;
}

export declare const PlacementTypes: ["top", "right", "bottom", "left"];
export declare type PlacementType = typeof PlacementTypes[number];
