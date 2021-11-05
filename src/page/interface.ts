import {FC, ReactNode} from "react";

export interface IPageContext {
	headerEl: Element | null;
	setHeaderEl: (element: Element | null) => void;
}

export interface IPageWithLayout<P> extends FC<P> {
	layout: (page: ReactNode) => ReactNode;
}
