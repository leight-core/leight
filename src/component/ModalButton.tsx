import {Button, ButtonProps, Modal, ModalProps} from "antd";
import {FC, useState} from "react";

export interface IModalButtonProps extends Partial<ModalProps> {
	button?: ButtonProps;
}

export const ModalButton: FC<IModalButtonProps> = ({button, ...props}) => {
	const [show, setShow] = useState(false);
	return <>
		<Button
			{...button}
			onClick={() => setShow(true)}
		/>
		<Modal
			visible={show}
			onCancel={() => setShow(false)}
			{...props}
		/>
	</>;
};
