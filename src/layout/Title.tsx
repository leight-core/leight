import {Head} from "next/document";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ITitleProps {
	title: string;
	params?: any;
	children?: never;
}

/**
 * When you need to update a (page) title, use this component. Title also goes
 * through the translation (params are available as... params).
 *
 * This is the end node, thus children are not intentionally supported.
 */
export const Title: FC<ITitleProps> = ({title, params}) => {
	const {t} = useTranslation();
	return <Head>
		<title key={"title"}>{t(title, {params})}</title>
	</Head>;
};
