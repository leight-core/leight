import {Descriptions, DescriptionsProps, List, ListProps, Space, Typography} from "antd";
import {FC, ReactNode} from "react";
import {isBrowser} from "react-device-detect";
import {useTranslation} from "react-i18next";

export interface IPreviewProps extends Partial<DescriptionsProps> {
	width?: number;
	translation?: string;
	children: { [index in string]: ReactNode };
	vertical?: boolean;
	listProps?: ListProps<any>;
}

export const Preview: FC<IPreviewProps> = ({width = 220, translation, listProps, vertical = true, children, ...props}) => {
	const {t} = useTranslation();
	return (isBrowser || !vertical) ? <Descriptions
		bordered
		size={"small"}
		column={1}
		labelStyle={{width: width + "px"}}
		{...props}
	>
		{Object.entries(children).map(([key, item]) => <Descriptions.Item key={key} label={t(translation ? (translation + "." + key) : key)}>
			{item ? item : "-"}
		</Descriptions.Item>)}
	</Descriptions> : <List size={"small"} {...listProps}>
		{Object.entries(children).map(([key, item]) => <List.Item
			key={key}
		>
			<List.Item.Meta
				title={t(translation ? (translation + "." + key) : key)}
				description={item ? item : "-"}
			/>
		</List.Item>)}
	</List>;
};

export interface ISmallPreviewProps {
	children: { [index in string]: ReactNode };
	translation?: string;
}

export const SmallPreview: FC<ISmallPreviewProps> = ({translation, children}) => {
	const {t} = useTranslation();
	return <Space direction={"vertical"} size={"small"}>
		{Object.entries(children).map(([key, item]) => <Space key={key} direction={"vertical"} size={"small"}>
			<Typography.Text type={"secondary"}>{t(translation ? (translation + "." + key) : key)}</Typography.Text>
			<span>{item ? item : "-"}</span>
		</Space>)}
	</Space>;
};
