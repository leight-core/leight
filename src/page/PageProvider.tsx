import {PageContext} from "@leight-core/leight";
import {FC, useRef} from "react";

export interface IPageProviderProps {
}

export const PageProvider: FC<IPageProviderProps> = ({children}) => {
	const headerRef = useRef();

	return <PageContext.Provider
		value={{
			headerRef,
		}}
	>
		{children}
	</PageContext.Provider>;
};
