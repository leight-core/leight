import {ReactNode} from "react";

export interface IDrawerContext {
	/**
	 * Is the drawer visible?
	 */
	readonly visible: boolean
	/**
	 * Set drawer's visibility.
	 *
	 * @param visible
	 */
	setVisible: (visible: boolean) => void
	/**
	 * Access to current drawer's content.
	 */
	readonly content: ReactNode
	/**
	 * Set content of the drawer (without visibility change).
	 *
	 * @param content
	 */
	setContent: (content: ReactNode) => void
	/**
	 * Current drawer width.
	 */
	readonly width: number
	/**
	 * Set drawer width.
	 *
	 * @param width
	 */
	setWidth: (width: number) => void
	/**
	 * Show drawer with the given content.
	 *
	 * @param content
	 */
	display: (content: ReactNode, width?: number) => void
	/**
	 * Display Markdown content.
	 *
	 * @param content
	 */
	markdown: (content: string, width?: number) => void
}
