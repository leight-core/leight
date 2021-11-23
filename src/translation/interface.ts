import {i18n} from "i18next";

export interface II18NextContext {
	i18next: i18n;
}

export interface ITranslation {
	language: string;
	namespace: string;
	label: string;
	text: string;
}

export interface ITranslations {
	translations: ITranslation[];
}
