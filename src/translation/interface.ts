import {i18n} from "i18next";

export interface II18NextContext {
	readonly i18next: i18n;
}

export interface ITranslation {
	readonly language: string;
	readonly namespace: string;
	readonly label: string;
	readonly text: string;
}

export interface ITranslations {
	readonly translations: ITranslation[];
}
