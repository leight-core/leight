import {TranslationOutlined} from "@ant-design/icons";
import i18next from "i18next";
import {FC} from "react";
import {useDiscoveryContext} from "../../discovery/DiscoveryContext";
import {ITranslations} from "../../interface/interface";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";

export interface ITranslationStepProps {
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link?: string;
}

export const TranslationStep: FC<ITranslationStepProps> = ({link = "translation", ...props}) => {
	const discoveryContext = useDiscoveryContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep
			icon={<TranslationOutlined/>}
			onStep={() => httpGet<ITranslations>(discoveryContext.link(link), {timeout: 10 * 1000 * 3})
				.on("response", ({translations}) => {
					translations.forEach(translation => i18next.addResource(translation.language, translation.namespace, translation.label, translation.text));
					stepLoaderContext.next();
				})
				.on("catch", e => {
					console.error(e);
					stepLoaderContext.setStatus("error");
				})
				.cleaner()}
			{...props}
		/>
	);
};
