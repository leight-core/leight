import {I18NextContext} from "@leight-core/leight";
import {i18n} from "i18next";
import {FC} from "react";

export interface II18NextProviderProps {
	i18next: i18n;
}

export const I18NextProvider: FC<II18NextProviderProps> = ({i18next, children}) => {
	return <I18NextContext.Provider value={{i18next}}>
		{children}
	</I18NextContext.Provider>;
};
