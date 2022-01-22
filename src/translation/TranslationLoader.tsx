import {TranslationOutlined} from "@ant-design/icons";
import {LoaderLayout, useI18NextContext, useTranslationQuery} from "@leight-core/leight";
import {FC, ReactNode, useEffect, useState} from "react";

export interface ITranslationLoaderProps {
	logo?: ReactNode;
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link: string;
}

export const TranslationLoader: FC<ITranslationLoaderProps> = ({logo, link, children}) => {
	const result = useTranslationQuery(link);
	const {i18next} = useI18NextContext();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (result.isSuccess) {
			result.data.translations.forEach(translation => {
				i18next.addResource(translation.language, "translation", translation.label, translation.text);
				console.log("adding translation", translation);
			});
			setIsLoading(false);
		}
	}, [result.isSuccess, result.data]);
	return <LoaderLayout
		logo={logo}
		icon={<TranslationOutlined/>}
		loading={isLoading}
		queryResult={result}
		errorText={"Translations cannot be loaded."}
	>
		{children}
	</LoaderLayout>;
};
