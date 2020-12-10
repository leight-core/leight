import {Col, Row} from "antd";
import React, {FC} from "react";

export interface IDualSectionProps {
	left: JSX.Element
	right: JSX.Element
}

export const DualSection: FC<IDualSectionProps> = ({left, right}) => {
	return (
		<Row>
			<Col xs={24} xl={12} children={left}/>
			<Col xs={24} xl={12} children={right}/>
		</Row>
	);
};
