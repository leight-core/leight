import { RightCircleOutlined } from "@ant-design/icons";
import { NumberRange } from "@leight-core/leight-js";
import {
	Result,
	Typography
} from "antd";
import { useTranslation } from "react-i18next";

const BulletCard = (
	{
		translation,
		count,
		icon = <></>
	}) => {
	const {t} = useTranslation();
	return (
		<Result
			icon={icon}
			title={t(translation + ".list.title")}
			style={{paddingTop: 0}}
		>
			{NumberRange(count).map(index => (
				<Typography.Paragraph key={index}>
					<RightCircleOutlined style={{color: "#1890ff"}}/>&nbsp;{t(translation + ".list.item-" + index)}
				</Typography.Paragraph>
			))}
		</Result>
	);
};

export default BulletCard;
