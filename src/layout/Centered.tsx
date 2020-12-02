import {Col, Row} from "antd";
import React from "react";

export const Centered = (
	{
		children,
		span = null
	}) => {
	return (
		<Row justify={"center"}>
			<Col span={span}>
				{children}
			</Col>
		</Row>
	);
};
