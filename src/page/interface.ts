import {FC, ReactNode} from "react";

export interface IPageContext {
	readonly breadcrumbEl: Element | null;

	setBreadcrumbEl(element: Element | null): void;

	readonly menuEl: Element | null;

	setMenuEl(element: Element | null): void;
}

export interface IPageWithLayout<P> extends FC<P> {
	layout(page: ReactNode): ReactNode;
}
