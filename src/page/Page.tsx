import {EmptyPage, IEmptyPageProps, INavigate, IPageHeaderProps, PageHeader, PageMenu, useNavigate} from "@leight-core/leight";
import {BreadcrumbProps, Card, CardProps} from "antd";
import Breadcrumb from "antd/lib/breadcrumb";
import * as React from "react";
import {FC, ReactNode} from "react";
import {isMobile} from "react-device-detect";

export type IPageBreadcrumb = BreadcrumbProps | React.ReactElement<typeof Breadcrumb>;

export interface IPageProps extends IEmptyPageProps {
	onBack?: (navigate: INavigate) => void;
	card?: Partial<CardProps>;
	breadcrumbProps?: IPageBreadcrumb;
	breadcrumbMobileProps?: IPageBreadcrumb;
	breadcrumbBrowserProps?: IPageBreadcrumb;
	icon?: ReactNode;
	extra?: ReactNode;
	extraMobile?: ReactNode;
	extraBrowser?: ReactNode;
	header?: ReactNode;
	cardProps?: CardProps;
	headerProps?: IPageHeaderProps;
}

export const Page: FC<IPageProps> = (
	{
		breadcrumbProps,
		breadcrumbMobileProps,
		breadcrumbBrowserProps,
		icon,
		extra,
		extraMobile,
		extraBrowser,
		cardProps,
		header,
		headerProps,
		children,
		title,
		onBack,
		...props
	}) => {
	const navigate = useNavigate();
	extra = extra || (isMobile ? extraMobile : extraBrowser);
	breadcrumbProps = breadcrumbProps || (isMobile ? breadcrumbMobileProps : breadcrumbBrowserProps);
	return <EmptyPage title={title} {...props}>
		{header || <PageHeader
			onBack={onBack ? () => onBack(navigate) : undefined}
			title={title}
			icon={icon}
			extra={extra ?? <PageMenu/>}
			ghost={false}
			breadcrumb={breadcrumbProps}
			style={isMobile ? {padding: "4px 0 0 12px"} : undefined}
			{...headerProps}
		/>}
		<Card
			bodyStyle={isMobile ? {padding: "8px"} : {padding: "0 18px"}}
			{...cardProps}
		>
			{children}
		</Card>
	</EmptyPage>;
};
