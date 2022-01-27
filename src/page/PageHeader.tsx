import {Centered, PushRight} from "@leight-core/leight";
import {Col, Row, Space, Typography} from "antd";
import {FC, ReactNode} from "react";
import {isMobile} from "react-device-detect";
import {useTranslation} from "react-i18next";

export interface IPageHeaderProps {
	title?: string;
	left?: ReactNode;
	right?: ReactNode;
}

export const PageHeader: FC<IPageHeaderProps> = ({left, right, title}) => {
	const {t} = useTranslation();
	return isMobile ?
		<Row>
			<Col span={8}>
				{left}
			</Col>
			<Col span={8}>
				<Centered>
					<Typography.Title level={1}>{t(title + ".title")}</Typography.Title>
				</Centered>
			</Col>
			<Col span={8}>
				<PushRight>
					{right}
				</PushRight>
			</Col>
		</Row> :
		<>
			<Space>
				{left}
				<Typography.Title level={1}>{t(title + ".title")}</Typography.Title>
			</Space>
			<PushRight>
				{right}
			</PushRight>
		</>;
};
