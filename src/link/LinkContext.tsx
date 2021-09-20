import {ILinkContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const LinkContext = createContext<ILinkContext>(null as unknown as ILinkContext);

export const useLinkContext = () => useContext<ILinkContext>(LinkContext, "LinkContext");
