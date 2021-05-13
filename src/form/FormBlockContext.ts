import {createContext} from "react";
import {IBlockContext} from "../block/interface";
import {useContext} from "../utils/useContext";

export const FormBlockContext = createContext<IBlockContext>(null as any);

/**
 * Access to UI blocking context of a Form.
 */
export const useFormBlockContext = () => useContext<IBlockContext>(FormBlockContext, "FormBlockContext");
