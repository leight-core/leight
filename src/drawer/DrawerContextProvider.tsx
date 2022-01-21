import {DrawerContext} from "@leight-core/leight";
import {FC, useState} from "react";

export interface IDrawerContextProviderProps {
}

export const DrawerContextProvider: FC<IDrawerContextProviderProps> = ({children}) => {
	const [visible, setVisible] = useState<boolean>(false);
	return <DrawerContext.Provider
		value={{
			visible,
			setVisible,
		}}
	>
		{children}
	</DrawerContext.Provider>;
};
