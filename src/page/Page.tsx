import {EmptyPage, IEmptyPageProps, INavigate, IPageHeaderProps, PageHeader, PageMenu, useIsMobile, useNavigate} from "@leight-core/leight";
import {BreadcrumbProps, Card, CardProps, Divider} from "antd";
import Breadcrumb from "antd/lib/breadcrumb";
import * as React from "react";
import {FC, ReactNode} from "react";

export type IPageBreadcrumb = BreadcrumbProps | React.ReactElement<typeof Breadcrumb>;

export interface IPageProps extends IEmptyPageProps {
	onBack?: (navigate: INavigate) => void;
	breadcrumbProps?: IPageBreadcrumb;
	breadcrumbMobileProps?: IPageBreadcrumb;
	breadcrumbBrowserProps?: IPageBreadcrumb;
	icon?: ReactNode;
	extra?: ReactNode;
	extraMobile?: ReactNode;
	extraBrowser?: ReactNode;
	header?: ReactNode;
	cardProps?: Partial<CardProps>;
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
	const isMobile = useIsMobile();
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
			bodyStyle={isMobile ? {padding: "8px"} : {padding: "18px 8px"}}
			{...cardProps}
		>
			{children}
			<Divider/>
		</Card>
	</EmptyPage>;
};
