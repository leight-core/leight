import {SettingOutlined} from "@ant-design/icons";
import {Card, Col, Modal, ModalProps, Row, Spin} from "antd";
import {FC} from "react";
import {useModalBlockContext} from "./ModalBlockContext";

export interface IModalBlockProps extends Partial<ModalProps> {
}

export const ModalBlock: FC<IModalBlockProps> = (props) => {
	const modalBlockContext = useModalBlockContext();
	return <>
		<Modal
			visible={modalBlockContext.isBlocked()}
			closable={false}
			style={{top: "20%"}}
			maskStyle={{opacity: "0.65"}}
			modalRender={() => <>
				<Row justify={"center"}>
					<Col>
						<Card style={{width: "24em", padding: "2.5em 0", textAlign: "center"}}>
							<Spin size={"large"} indicator={<SettingOutlined spin/>} spinning={true}/>
						</Card>
					</Col>
				</Row>
			</>}
			{...props}
		/>
	</>;
};
