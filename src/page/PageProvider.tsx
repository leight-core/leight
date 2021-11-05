import {PageContext} from "@leight-core/leight";
import {FC, useState} from "react";

export interface IPageProviderProps {
}

export const PageProvider: FC<IPageProviderProps> = ({children}) => {
	const [breadcrumbEl, setBreadcrumbEl] = useState<Element | null>(null);
	const [menuEl, setMenuEl] = useState<Element | null>(null);
	return <PageContext.Provider
		value={{
			breadcrumbEl,
			setBreadcrumbEl,
			menuEl,
			setMenuEl,
		}}
	>
		{children}
	</PageContext.Provider>;
};
