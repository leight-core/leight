import {useModalBlockContext} from "@leight-core/leight";
import {Modal, ModalProps} from "antd";
import {FC} from "react";

export interface IModalBlockProps extends Partial<ModalProps> {
}

export const ModalBlock: FC<IModalBlockProps> = (props) => {
	const modalBlockContext = useModalBlockContext();
	return <Modal
		visible={modalBlockContext.isBlocked()}
		closable={false}
		style={{top: "20%"}}
		maskStyle={{opacity: "0.65"}}
		modalRender={() => null}
		{...props}
	/>;
};
