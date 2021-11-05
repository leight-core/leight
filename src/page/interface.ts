import {FC, ReactNode} from "react";

export interface IPageContext {
	breadcrumbEl: Element | null;
	setBreadcrumbEl: (element: Element | null) => void;
	menuEl: Element | null;
	setMenuEl: (element: Element | null) => void;
}

export interface IPageWithLayout<P> extends FC<P> {
	layout: (page: ReactNode) => ReactNode;
}
