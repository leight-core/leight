import {EmptyPage, IEmptyPageProps} from "@leight-core/leight";
import {Card} from "antd";
import {useRouter} from "next/router";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface IPageProps extends IEmptyPageProps {
	/**
	 * The page title (main title); it goes through translation.
	 */
	h1?: string;
}

export const Page: FC<IPageProps> = ({h1, children, ...props}) => {
	const {t} = useTranslation();
	const router = useRouter();
	return <EmptyPage menuItems={[router.route]} title={props.name} {...props}>
		<Card title={t(h1 ? h1 : props.name + ".title")}>
			{children}
		</Card>
	</EmptyPage>;
};
