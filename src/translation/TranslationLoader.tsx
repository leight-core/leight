import {TranslationOutlined} from "@ant-design/icons";
import {LoaderLayout} from "@leight-core/leight";
import {FC, ReactNode} from "react";
import {useTranslationQuery} from "./useTranslationQuery";

export interface ITranslationLoaderProps {
	logo?: ReactNode;
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link?: string;
}

export const TranslationLoader: FC<ITranslationLoaderProps> = ({logo, link, children}) => {
	const {result} = useTranslationQuery(link || "translation.index");
	return <LoaderLayout
		logo={logo}
		icon={<TranslationOutlined/>}
		queryResult={result}
		errorText={"Translations cannot be loaded."}
	>
		{children}
	</LoaderLayout>;
};
