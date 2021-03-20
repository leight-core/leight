import {Layout} from "antd";
import {FC, useEffect, useState} from "react";
import {Block} from "../block/Block";
import {useBlockContext} from "../block/BlockContext";
import {Loader} from "../component/Loader";
import {useMenuContext} from "../menu/MenuContext";
import {MenuProvider} from "../menu/MenuProvider";
import {LayoutContext} from "./LayoutContext";

export interface IBaseLayoutProps {
}

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

export const BaseLayout: FC<IBaseLayoutProps> = ({children}) => {
	return (
		<Block>
			<MenuProvider>
				<BaseLayoutInternal children={children}/>
			</MenuProvider>
		</Block>
	);
};
