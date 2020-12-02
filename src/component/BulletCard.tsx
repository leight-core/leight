import {RightCircleOutlined} from "@ant-design/icons";
import {Result, Typography} from "antd";
import PropTypes from "prop-types";
import React from "react";
import {useTranslation} from "react-i18next";
import {NumberRange} from "../utils/NumberRange";

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
export const BulletCard = (
	{
		title,
		count,
		icon = false,
	}) => {
	const {t} = useTranslation();
	return (
		<Result
			icon={icon === false ? <></> : icon}
			title={t(title)}
			style={{paddingTop: 0}}
		>
			{NumberRange(count).map(index => (
				<Typography.Paragraph key={index}>
					<RightCircleOutlined style={{color: "#1890ff"}}/>&nbsp;{t(title + ".list.item-" + index)}
				</Typography.Paragraph>
			))}
		</Result>
	);
};

BulletCard.propTypes = {
	/**
	 * Title of the bullet card; uses translation.
	 */
	title: PropTypes.string.isRequired,
	/**
	 * Number of bullets.
	 */
	count: PropTypes.number.isRequired,
	/**
	 * Optional icon (used in Result under the hood).
	 */
	icon: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.node,
	]),
}
