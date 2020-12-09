import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IBlockContext} from "./interface";

export const BlockContext = createContext<IBlockContext>(null as unknown as IBlockContext);

export const useBlockContext = () => useContext<IBlockContext>(BlockContext, "BlockContext");
