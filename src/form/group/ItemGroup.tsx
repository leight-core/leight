import {NamePath} from "rc-field-form/lib/interface";
import {useOptionalItemGroupContext} from "./ItemGroupContext";
import {ItemGroupContextProvider} from "./ItemGroupContextProvider";

export interface IItemGroupProps {
	prefix: NamePath
}

export const ItemGroup = ({prefix, children}) => {
	const itemGroupContext = useOptionalItemGroupContext();
	const name = ([] as string[]).concat(itemGroupContext?.prefix || [], Array.isArray(prefix) ? prefix : [prefix]);
	return (
		<ItemGroupContextProvider prefix={name} children={children}/>
	);
};
