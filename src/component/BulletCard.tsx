import {RightCircleOutlined} from "@ant-design/icons";
import {NumberRange} from "@leight-core/leight";
import {Result, Typography} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IBulletCardProps {
	/**
	 * Title of the bullet card; uses translation.
	 */
	title: string;
	/**
	 * Number of bullets.
	 */
	count: number;
	/**
	 * Optional icon (used in Result under the hood).
	 */
	icon: boolean | ReactNode;
}

/**
 * Simple bullet card using "Result" component from Antd
 *
 * Props:
 *
 * - **title** goes through translator
 * - **count** is the number of bullets
 * - **icon** an icon to the Result component
 *
 * See:
 *
 * - https://ant.design/components/result/
 */
export const BulletCard: FC<IBulletCardProps> = (
	{
		title,
		count,
		icon = false,
	}) => {
	const {t} = useTranslation();
	return <Result
		icon={icon === false ? <></> : icon}
		title={t(title)}
		style={{paddingTop: 0}}
	>
		{NumberRange(count).map(index => (
			<Typography.Paragraph key={index}>
				<RightCircleOutlined style={{color: "#1890ff"}}/>&nbsp;{t(title + ".list.item-" + index)}
			</Typography.Paragraph>
		))}
	</Result>;
};
