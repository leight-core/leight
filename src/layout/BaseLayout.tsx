import {Layout} from "antd";
import {FC, useEffect, useState} from "react";
import {useBlockContext} from "../block/BlockContext";
import {BlockContextProvider} from "../block/BlockContextProvider";
import {Loader} from "../component/Loader";
import {useMenuContext} from "../menu/MenuContext";
import {LayoutContext} from "./LayoutContext";

const BaseLayoutInternal = ({children}) => {
	const [fullscreen, setFullscreen] = useState<boolean>(false);
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const blockContext = useBlockContext();
	return (
		<LayoutContext.Provider
			value={{
				blockContext,
				menuContext: useMenuContext(),
				fullscreen,
				useEnableFullscreen: (enable = true, restore = true) => useEffect(() => {
					setFullscreen(enable);
					return () => setFullscreen(!restore);
					// eslint-disable-next-line
				}, []),
				collapsed,
				setCollapsed,
			}}
			children={
				<Loader isLoading={blockContext.isBlocked()}>
					<Layout children={children}/>
				</Loader>
			}
		/>
	);
};

export interface IBaseLayoutProps {
}

export const BaseLayout: FC<IBaseLayoutProps> = ({children}) => {
	return (
		<BlockContextProvider>
			<BaseLayoutInternal children={children}/>
		</BlockContextProvider>
	);
};
