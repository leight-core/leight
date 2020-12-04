import {TranslationOutlined} from "@ant-design/icons";
import i18next from "i18next";
import {FC} from "react";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {httpGet} from "../../server/httpGet";
import {Events} from "../../utils/Events";
import {useAppContext} from "../AppContext";

export interface ITranslation {
	language: string
	namespace: string
	label: string
	text: string
}

export interface ITranslations {
	translations: ITranslation[]
}

export interface ITranslationStep {
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link?: string
}

export const TranslationStep: FC<ITranslationStep> = ({link = "public.translation", ...props}) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<TranslationOutlined/>} {...props} onStep={() => {
			const cancelToken = httpGet(
				appContext.link(link),
				Events()
					.on<ITranslations>("success", ({translations}) => {
						translations.forEach(translation => i18next.addResource(translation.language, translation.namespace, translation.label, translation.text));
						stepLoaderContext.next();
					})
					.on("catch", () => {
						stepLoaderContext.setStatus("error");
					})
			);
			return () => cancelToken.cancel();
		}}/>
	);
};
