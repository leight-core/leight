import {ReactNode, useEffect, useState} from "react";
import {ButtonContext} from "./ButtonContext";
import {IButtonIndex} from "./interface";

export interface IButtonContextProviderProps<TButtons extends string> {
	defaultDisabled?: IButtonIndex<TButtons>
	children?: ReactNode
}

export const ButtonContextProvider = <TButtons extends string>({children, defaultDisabled}: IButtonContextProviderProps<TButtons>) => {
	const [disabled, setDisabled] = useState<IButtonIndex<TButtons>>((defaultDisabled || {}) as any);
	return <ButtonContext.Provider
		value={{
			disable: (button, disable = true) => setDisabled(prev => ({...prev, [button]: disable})),
			isDisabled: button => disabled[button],
			useDisable: function (button, disable = true, deps = []) {
				useEffect(() => this.disable(button, disable), deps);
			},
		}}
		children={children}
	/>;
};
