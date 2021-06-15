import {createContext} from "react";
import {IBlockContext} from "../block/interface";
import {useContext} from "../utils/useContext";

export const LayoutBlockContext = createContext<IBlockContext>(null as unknown as IBlockContext);

export const useLayoutBlockContext = () => useContext<IBlockContext>(LayoutBlockContext, "LayoutBlockContext");
