import {IQueryParams, LinkTo} from "@leight-core/leight";
import {Breadcrumb, BreadcrumbItemProps, Space, Tooltip} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IBreadcrumbLinkItemProps extends Partial<BreadcrumbItemProps> {
	href: string;
	query?: IQueryParams;
	icon?: ReactNode;
	data: any;
	translation: string;
	tooltip?: boolean;
}

export const BreadcrumbLinkItem: FC<IBreadcrumbLinkItemProps> = ({href, query, icon, data, translation, tooltip = false, ...props}) => {
	const {t} = useTranslation();
	return <Breadcrumb.Item {...props}>
		<LinkTo href={href} query={query}>
			{tooltip && <Tooltip title={t(translation + ".tooltip", {data})}>
				<Space size={4}>
					{icon}
					<span>{t(translation, {data})}</span>
				</Space>
			</Tooltip>}
			{!tooltip && <Space size={4}>
				{icon}
				<span>{t(translation, {data})}</span>
			</Space>}
		</LinkTo>
	</Breadcrumb.Item>;
};
