export interface ITranslation {
	language: string;
	namespace: string;
	label: string;
	text: string;
}

export interface ITranslations {
	translations: ITranslation[];
}
