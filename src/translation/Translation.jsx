import i18next from "i18next";
import { useState } from "react";
import { Events } from "../utils";
import {
	LanguageErrorView,
	LoaderView
} from "../view/";
import useTranslation from "./useTranslation";

const Translation = (
	{
		children,
		link = "common.translation"
	}) => {
	const [status, setStatus] = useState();
	useTranslation(
		Events()
			.on("success", ({translations}) => {
				for (const translation of
					translations) {
					i18next.addResource(translation.language, translation.namespace, translation.label, translation.text);
				}
				setStatus(true);
			})
			.on("error", () => {
				setStatus(false);
			}),
		link
	);
	switch (status) {
		case true:
			return children;
		case false:
			return <LanguageErrorView/>;
		default:
			return <LoaderView/>;
	}
};

export default Translation;
