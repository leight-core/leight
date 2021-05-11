import {NamePath} from "rc-field-form/lib/interface";
import {FC} from "react";
import {useOptionalItemGroupContext} from "./ItemGroupContext";
import {ItemGroupContextProvider} from "./ItemGroupContextProvider";

export interface IItemGroupProps {
	prefix: NamePath
}

/**
 * Simple component used to add prefixes to FormItems (so it's possible to arbitrary alter field names).
 *
 * Internally context is used, so the stuff works regardless of the component tree.
 *
 * Also, do no not use some kind of "global" item group.
 */
export const ItemGroup: FC<IItemGroupProps> = ({prefix, children}) => {
	const itemGroupContext = useOptionalItemGroupContext();
	const name = ([] as (string | number)[]).concat(itemGroupContext?.prefix || [], Array.isArray(prefix) ? prefix : [prefix]);
	return (
		<ItemGroupContextProvider prefix={name} children={children}/>
	);
};
