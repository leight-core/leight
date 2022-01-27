import {Centered, PushRight} from "@leight-core/leight";
import {Col, Row} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IPageHeaderProps {
	title?: string;
	left?: ReactNode;
	right?: ReactNode;
}

export const PageHeader: FC<IPageHeaderProps> = ({left, right, title}) => {
	const {t} = useTranslation();
	return <Row>
		<Col span={8}>
			{left}
		</Col>
		<Col span={8}>
			{title && <Centered>
				{t(title + ".title")}
			</Centered>}
		</Col>
		<Col span={8}>
			<PushRight>
				{right}
			</PushRight>
		</Col>
	</Row>;
};
