import {useButtonContext} from "../button/ButtonContext";
import {IWizardButton} from "./interface";

/**
 * Provides an access to buttons in a Wizard component; could be used just from any step component.
 */
export const useWizardButtonContext = () => useButtonContext<IWizardButton>();
