import {SiderCollapseContext} from "@leight-core/leight";
import {FC, PropsWithChildren, useEffect, useState} from "react";

export type ISiderCollapseProviderProps = PropsWithChildren<{
	defaultCollapsed?: boolean;
}>

export const SiderCollapseProvider: FC<ISiderCollapseProviderProps> = ({defaultCollapsed = false, ...props}) => {
	const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
	return <SiderCollapseContext.Provider
		value={{
			collapsed,
			useCollapse: (collapsed, restore) => {
				useEffect(() => {
					if (collapsed === undefined) {
						return;
					}
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
