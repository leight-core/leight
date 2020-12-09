import {Layout} from "antd";
import {FC, useEffect, useState} from "react";
import {Block} from "../block/Block";
import {useBlockContext} from "../block/BlockContext";
import {Loader} from "../component/Loader";
import {useMenuContext} from "../menu/MenuContext";
import {MenuProvider} from "../menu/MenuProvider";
import {LayoutContext} from "./LayoutContext";

export interface IBaseLayout {
}

const BaseLayoutInternal = ({children}) => {
	const [fullscreen, setFullscreen] = useState<boolean>(false);
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const [data, setData] = useState<any>();
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
				data,
				setData,
			}}
			children={
				<Loader isLoading={blockContext.isBlocked()}>
					<Layout children={children}/>
				</Loader>
			}
		/>
	);
};

export const BaseLayout: FC<IBaseLayout> = ({children}) => {
	return (
		<Block>
			<MenuProvider>
				<BaseLayoutInternal children={children}/>
			</MenuProvider>
		</Block>
	);
};
