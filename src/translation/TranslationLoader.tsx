import {TranslationOutlined} from "@ant-design/icons";
import {httpGet, ITranslations, LoaderLayout, useDiscoveryContext} from "@leight-core/leight";
import i18next from "i18next";
import {FC, ReactNode, useEffect, useState} from "react";

export interface ITranslationLoaderProps {
	logo?: ReactNode;
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link?: string;
}

export const TranslationLoader: FC<ITranslationLoaderProps> = ({logo, link, children}) => {
	const discoveryContext = useDiscoveryContext();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => httpGet<ITranslations>(discoveryContext.link(link || "translation.index"), {timeout: 10 * 1000 * 3})
		.on("response", ({translations}) => {
			translations.forEach(translation => i18next.addResource(translation.language, "translation", translation.label, translation.text));
			setLoading(false);
		})
		.on("catch", e => {
			console.error(e);
			setError(true);
		})
		.cleaner(), []
	);

	return <LoaderLayout
		logo={logo}
		icon={<TranslationOutlined/>}
		loading={loading}
		error={error}
		errorText={"Translations cannot be loaded."}
	>
		{children}
	</LoaderLayout>;
};
