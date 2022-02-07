import {List, ListProps} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IPreviewProps extends Partial<ListProps<any>> {
	translation?: string;
	children: { [index in string]: ReactNode };
}

export const Preview: FC<IPreviewProps> = ({translation, children, ...props}) => {
	const {t} = useTranslation();
	return <List itemLayout={"vertical"} size={"small"} {...props}>
		{Object.entries(children).map(([key, item]) => <List.Item
			key={key}
		>
			<List.Item.Meta title={t(translation ? (translation + "." + key) : key)}/>
			{item ? item : "-"}
		</List.Item>)}
	</List>;
};
