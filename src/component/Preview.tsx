import {Descriptions, DescriptionsProps} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IPreviewProps extends Partial<DescriptionsProps> {
	width?: number;
	children: { [index in string]: ReactNode };
}

export const Preview: FC<IPreviewProps> = ({width = 220, children, ...props}) => {
	const {t} = useTranslation();
	return <Descriptions
		bordered
		size={"small"}
		column={1}
		labelStyle={{width: width + "px"}}
		{...props}
	>
		{Object.entries(children).map(([key, item]) => <Descriptions.Item key={key} label={t(key)}>
			{item}
		</Descriptions.Item>)}
	</Descriptions>;
};
