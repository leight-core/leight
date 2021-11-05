import {PageContext} from "@leight-core/leight";
import {FC, useState} from "react";

export interface IPageProviderProps {
}

export const PageProvider: FC<IPageProviderProps> = ({children}) => {
	const [headerEl, setHeaderEl] = useState<Element | null>(null);
	return <PageContext.Provider
		value={{
			headerEl,
			setHeaderEl,
		}}
	>
		{children}
	</PageContext.Provider>;
};
