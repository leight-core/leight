import {EmptyPage, IEmptyPageProps, PageBreadcrumb, PageMenu} from "@leight-core/leight";
import {Card, CardProps, Col, Row, Space, Typography} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IPageProps extends IEmptyPageProps {
	/**
	 * The page title (main title); it goes through translation.
	 */
	h1?: string;
	card?: Partial<CardProps>;
	breadcrumb?: (() => ReactNode) | null;
	menu?: (() => ReactNode) | null;
}

export const Page: FC<IPageProps> = (
	{
		h1,
		breadcrumb = () => <PageBreadcrumb/>,
		menu = () => <PageMenu/>,
		card,
		...props
	}) => {
	const {t} = useTranslation();
	return <EmptyPage title={props.name} {...props}>
		<Card
			title={
				<Row align={"middle"}>
					<Col span={12}>
						{breadcrumb && <Space direction={"vertical"}>
							<Typography.Title className={"page-title"} level={4}>{t(h1 ? h1 : props.name + ".title")}</Typography.Title>
							{breadcrumb()}
						</Space>}
						{!breadcrumb && <Typography.Title className={"page-title"} level={4}>{t(h1 ? h1 : props.name + ".title")}</Typography.Title>}
					</Col>
					<Col span={12}>
						{menu && menu()}
					</Col>
				</Row>
			}
			{...props}
			{...card}
		/>
	</EmptyPage>;
};
