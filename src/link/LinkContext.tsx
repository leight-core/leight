import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {ILinkContext} from "./interface";

export const LinkContext = createContext<ILinkContext>(null as unknown as ILinkContext);

export const useLinkContext = () => useContext<ILinkContext>(LinkContext, "LinkContext");
