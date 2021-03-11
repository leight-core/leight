import {TranslationOutlined} from "@ant-design/icons";
import i18next from "i18next";
import {FC} from "react";
import {ITranslations} from "../../interface/interface";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {useAppContext} from "../AppContext";

export interface ITranslationStepProps {
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link?: string
}

export const TranslationStep: FC<ITranslationStepProps> = ({link = "public.translation", ...props}) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<TranslationOutlined/>} {...props} onStep={() => {
			const events = httpGet<ITranslations>(appContext.link(link))
				.on("response", ({translations}) => {
					translations.forEach(translation => i18next.addResource(translation.language, translation.namespace, translation.label, translation.text));
					stepLoaderContext.next();
				})
				.on("catch", () => {
					stepLoaderContext.setStatus("error");
				});
			return () => events.dismiss();
		}}/>
	);
};
