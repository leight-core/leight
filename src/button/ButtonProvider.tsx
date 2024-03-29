import {ButtonContext, IButtonContext, IButtonIndex} from "@leight-core/leight";
import {ReactNode, useEffect, useState} from "react";

export interface IButtonProviderProps<TButtons extends string> {
	defaultDisabled?: IButtonIndex<TButtons>;
	children?: ReactNode;
}

export const ButtonProvider = <TButtons extends string>({children, defaultDisabled}: IButtonProviderProps<TButtons>) => {
	const [disabled, setDisabled] = useState<IButtonIndex<TButtons>>((defaultDisabled || {}) as any);
	return <ButtonContext.Provider
		value={{
			disable: (button, disable = true) => setDisabled(prev => ({...prev, [button]: disable})),
			enable: function (button, enable = true) {
				return this.disable(button, !enable);
			},
			isDisabled: button => disabled[button],
			useDisable: function (button, disable = true, deps = []) {
				useEffect(() => this.disable(button, disable), deps);
			},
			useEnable: function (button, enable = true, deps = []) {
				this.useDisable(button, !enable, deps);
			},
		} as IButtonContext<TButtons>}
	>
		{children}
	</ButtonContext.Provider>;
};
