import {SiderCollapseContext} from "@leight-core/leight";
import {FC, useEffect, useState} from "react";

export interface ISiderCollapseProviderProps {
	defaultCollapsed?: boolean;
}

export const SiderCollapseProvider: FC<ISiderCollapseProviderProps> = ({defaultCollapsed = false, ...props}) => {
	const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
	return <SiderCollapseContext.Provider
		value={{
			collapsed,
			useCollapse: (collapsed, restore) => {
				useEffect(() => {
					setCollapsed(collapsed);
					return () => {
						restore && setCollapsed(!collapsed);
					};
				}, [collapsed]);
			},
			setCollapsed,
		}}
		{...props}
	/>;
};
