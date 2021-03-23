import {FC, ReactNode, useEffect} from "react";
import {useLayoutContext} from "./LayoutContext";

export interface IUpdateHeaderProps {
	header?: () => ReactNode
	deps?: any[]
}

export const UpdateHeader: FC<IUpdateHeaderProps> = ({header, deps = [], children}) => {
	const layoutContext = useLayoutContext();
	useEffect(() => {
		header && layoutContext.setHeader(header());
	}, deps);
	return <>{children}</>;
};
