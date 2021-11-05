import {EmptyPage, IEmptyPageProps, PageHeader} from "@leight-core/leight";
import {Card, CardProps, Divider, Space, Typography} from "antd";
import {useRouter} from "next/router";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IPageProps extends IEmptyPageProps {
	/**
	 * The page title (main title); it goes through translation.
	 */
	h1?: string;
	card?: Partial<CardProps>;
	header?: () => ReactNode;
}

export const Page: FC<IPageProps> = ({h1, header = () => <PageHeader/>, card, ...props}) => {
	const {t} = useTranslation();
	const router = useRouter();
	return <EmptyPage menuItems={[router.route]} title={props.name} {...props}>
		<Card
			title={
				<Space align={"baseline"} split={<Divider type={"vertical"}/>} size={"small"}>
					<Typography.Title level={3}>{t(h1 ? h1 : props.name + ".title")}</Typography.Title>
					{header()}
				</Space>
			}
			{...props}
			{...card}
		/>
	</EmptyPage>;
};
