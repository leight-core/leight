import {useButtonContext} from "../button/ButtonContext";
import {IWizardButton} from "./interface";

export const useWizardButtonContext = () => useButtonContext<IWizardButton>();
