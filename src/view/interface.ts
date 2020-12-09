import {IBlockContext} from "../block/interface";

export interface IViewContext {
	/**
	 * Because there could be more blocking contexts, this one is bound to the
	 * current view.
	 */
	blockContext: IBlockContext
}
