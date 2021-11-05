import {FC, MutableRefObject, ReactNode} from "react";

export interface IPageContext {
	headerRef: MutableRefObject<any>;
}

export interface IPageWithLayout<P> extends FC<P> {
	layout: (page: ReactNode) => ReactNode;
}
