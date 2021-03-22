import {Layout} from "antd";
import {FC, useEffect, useState} from "react";
import {useBlockContext} from "../block/BlockContext";
import {BlockContextProvider} from "../block/BlockContextProvider";
import {Loader} from "../component/Loader";
import {useMenuContext} from "../menu/MenuContext";
import {LayoutContext} from "./LayoutContext";

const BaseLayoutInternal = ({children}) => {
	const [fullwidth, setFullwidth] = useState<boolean>(false);
	const [siderSize, setSiderSize] = useState<number>(240);
	const blockContext = useBlockContext();
	return (
		<LayoutContext.Provider
			value={{
				blockContext,
				menuContext: useMenuContext(),
				siderSize,
				setSiderSize,
				fullwidth,
				useEnableFullwidth: (enable = true, restore = true) => useEffect(() => {
					setFullwidth(enable);
					return () => setFullwidth(!restore);
					// eslint-disable-next-line
				}, []),
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
