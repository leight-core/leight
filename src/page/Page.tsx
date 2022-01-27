import {EmptyPage, IEmptyPageProps, INavigate, IPageHeaderProps, PageHeader, useNavigate} from "@leight-core/leight";
import {BreadcrumbProps, Card, CardProps} from "antd";
import {FC, ReactNode} from "react";

export interface IPageProps extends IEmptyPageProps {
	onBack?: (navigate: INavigate) => void;
	card?: Partial<CardProps>;
	breadcrumbProps?: BreadcrumbProps;
	icon?: ReactNode;
	extra?: ReactNode;
	header?: ReactNode;
	cardProps?: CardProps;
	headerProps?: IPageHeaderProps;
}

export const Page: FC<IPageProps> = (
	{
		breadcrumbProps,
		icon,
		extra,
		cardProps,
		header,
		headerProps,
		children,
		title,
		onBack,
		...props
	}) => {
	const navigate = useNavigate();
	return <EmptyPage title={title} {...props}>
		{header || <PageHeader
			onBack={onBack ? () => onBack(navigate) : undefined}
			title={title}
			icon={icon}
			extra={extra}
			ghost={false}
			breadcrumb={breadcrumbProps}
			{...headerProps}
		/>}
		<Card {...cardProps}>
			{children}
		</Card>
	</EmptyPage>;
};
