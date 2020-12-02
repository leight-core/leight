import {Col, Row} from "antd";
import React, {FC} from "react";

export interface IDualSection {
	left: JSX.Element
	right: JSX.Element
}

export const DualSection: FC<IDualSection> = (
	{
		left,
		right
	}) => {
	return (
		<Row>
			<Col xs={24} xl={12}>
				{left}
			</Col>
			<Col xs={24} xl={12}>
				{right}
			</Col>
		</Row>
	);
};
