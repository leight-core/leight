import {Descriptions, DescriptionsProps} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IPreviewProps extends Partial<DescriptionsProps> {
	width?: number;
	translation?: string;
	children: { [index in string]: ReactNode };
}

export const Preview: FC<IPreviewProps> = ({width = 220, translation, children, ...props}) => {
	const {t} = useTranslation();
	return <Descriptions
		bordered
		size={"small"}
		column={1}
		labelStyle={{width: width + "px"}}
		{...props}
	>
		{Object.entries(children).map(([key, item]) => <Descriptions.Item key={key} label={t(translation ? (translation + "." + key) : key)}>
			{item ?? "-"}
		</Descriptions.Item>)}
	</Descriptions>;
};
