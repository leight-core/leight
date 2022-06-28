import {Col, Row} from "antd";
import React, {FC, PropsWithChildren} from "react";

export type IPushRightProps = PropsWithChildren<{
	span?: number;
}>;

export const PushRight: FC<IPushRightProps> = (
	{
		children,
		span
	}) => {
	return (
		<Row align={"middle"} justify={"end"}>
			<Col span={span}>
				{children}
			</Col>
		</Row>
	);
};
