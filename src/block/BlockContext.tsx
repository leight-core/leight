import {IBlockContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const BlockContext = createContext<IBlockContext>(null as unknown as IBlockContext);

export const useBlockContext = () => useContext<IBlockContext>(BlockContext, "BlockContext");
