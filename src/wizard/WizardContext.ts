import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IWizardContext} from "./interface";

export const WizardContext = createContext(null as unknown as IWizardContext);

export const useWizardContext = () => useContext<IWizardContext>(WizardContext, "WizardContext", "Please use Wizard component.");
