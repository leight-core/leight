import {DependencyList, FC, useEffect} from "react";
import {useLayoutContext} from "./LayoutContext";

export interface IUpdatePageHeaderProps {
	deps?: DependencyList;
}

export const UpdatePageHeader: FC<IUpdatePageHeaderProps> = ({deps = [], children}) => {
	const layoutContext = useLayoutContext();
	useEffect(() => {
		children && layoutContext.setPageHeader(children);
	}, deps);
	return null;
};
