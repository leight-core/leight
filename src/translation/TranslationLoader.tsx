import {TranslationOutlined} from "@ant-design/icons";
import {httpGet, ITranslations, LoaderIcon, useDiscoveryContext} from "@leight-core/leight";
import {Result} from "antd";
import i18next from "i18next";
import {FC, useEffect, useState} from "react";

export interface ITranslationLoaderProps {
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link?: string;
}

export const TranslationLoader: FC<ITranslationLoaderProps> = ({link = "translation.index", children}) => {
	const discoveryContext = useDiscoveryContext();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => httpGet<ITranslations>(discoveryContext.link(link), {timeout: 10 * 1000 * 3})
		.on("response", ({translations}) => {
			translations.forEach(translation => i18next.addResource(translation.language, translation.namespace, translation.label, translation.text));
			setLoading(false);
		})
		.on("catch", e => {
			console.error(e);
			setError(true);
		})
		.cleaner(), []
	);

	return <>
		{loading && !error && <Result
			icon={<TranslationOutlined/>}
			title={<LoaderIcon/>}
		/>}
		{error && <Result
			icon={<TranslationOutlined/>}
			status={"error"}
			title={<LoaderIcon/>}
			subTitle={"Translations cannot be loaded."}
		/>}
		{!loading && !error && children}
	</>;
};
