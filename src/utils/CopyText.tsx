import {Typography} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ICopyTextProps {
	/**
	 * Optional text to copy
	 */
	text?: string | null;
	copy?: string | null;
	/**
	 * Default text
	 */
	defaultText?: string;
	/**
	 * Translation label for copy tooltips
	 */
	label: string;
}

export const CopyText: FC<ICopyTextProps> = ({text, label, copy = text, defaultText = "-"}) => {
	const {t} = useTranslation();
	return <>
		{(text && copy) ? <Typography.Text
			copyable={{
				text: copy,
				tooltips: [t(label + ".copy"), t(label + ".copied")]
			}}
			children={text}
		/> : defaultText}
	</>;
};
