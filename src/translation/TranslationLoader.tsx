import {TranslationOutlined} from "@ant-design/icons";
import {LoaderLayout} from "@leight-core/leight";
import i18next from "i18next";
import {FC, ReactNode, useEffect} from "react";
import {useTranslationQuery} from "./useTranslationQuery";

export interface ITranslationLoaderProps {
	logo?: ReactNode;
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link?: string;
}

export const TranslationLoader: FC<ITranslationLoaderProps> = ({logo, link, children}) => {
	const result = useTranslationQuery(link || "translation.index");
	useEffect(() => {
		result.isSuccess && result.data.translations.forEach(translation => i18next.addResource(translation.language, "translation", translation.label, translation.text));
	}, [result.isSuccess, result.data]);
	return <LoaderLayout
		logo={logo}
		icon={<TranslationOutlined/>}
		queryResult={result}
		errorText={"Translations cannot be loaded."}
	>
		{children}
	</LoaderLayout>;
};
