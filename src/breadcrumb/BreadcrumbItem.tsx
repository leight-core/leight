import {Breadcrumb, BreadcrumbItemProps, Space, Tooltip} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IBreadcrumbItemProps extends Partial<BreadcrumbItemProps> {
	icon?: ReactNode;
	translation: string;
	data: any;
	tooltip?: boolean;
}

export const BreadcrumbItem: FC<IBreadcrumbItemProps> = ({icon, translation, data, tooltip = false, ...props}) => {
	const {t} = useTranslation();
	return <Breadcrumb.Item {...props}>
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
	</Breadcrumb.Item>;
};
