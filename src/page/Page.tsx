import {Card} from "antd";
import {useRouter} from "next/router";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {EmptyPage, IEmptyPageProps} from "./EmptyPage";

export interface IPageProps extends IEmptyPageProps {
	/**
	 * The page title (main title); it goes through translation.
	 */
	h1?: string;
}

export const Page: FC<IPageProps> = ({h1, children, ...props}) => {
	const {t} = useTranslation();
	const router = useRouter();
	return <EmptyPage menuItems={[router.pathname]} {...props}>
		<Card title={t(h1 ? h1 : props.name + ".title")}>
			{children}
		</Card>
	</EmptyPage>;
};
