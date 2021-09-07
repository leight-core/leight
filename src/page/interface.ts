import {FC, ReactNode} from "react";

export interface IPageWithLayout<P extends Object> extends FC<P> {
	layout: (page: ReactNode) => ReactNode;
}
