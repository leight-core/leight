import {FC, useState} from "react";
import {BlockContext} from "./BlockContext";

export interface IBlockProps {
	/**
	 * Default blocking state; "false" if not specified.
	 */
	locked?: boolean
}

export const Block: FC<IBlockProps> = ({locked = false, children}) => {
	const [lock, setLock] = useState<boolean>(locked);
	const [count, setCount] = useState<number>(0);
	const isBlocking = () => count > 0 || lock;
	return (
		<BlockContext.Provider
			value={{
				count,
				isBlocked: isBlocking,
				block: (temp = false) => {
					if (temp) {
						return setLock(true);
					}
					setCount(prev => prev + 1);
				},
				unblock: (unlock = false) => {
					lock && setLock(false);
					setCount(unlock ? 0 : prev => prev - 1);
				},
			}}
			children={children}
		/>
	);
};
