import {Button, Popconfirm} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {CancelIcon} from "../../icon/CancelIcon";
import {useWizardContext} from "../WizardContext";

export interface ICancelButtonProps {
}

export const CancelButton: FC<ICancelButtonProps> = () => {
	const {t} = useTranslation();
	const wizardContext = useWizardContext();
	return (
		<Popconfirm
			okText={t("common.yes")}
			cancelText={t("common.no")}
			title={t([
				"wizard." + wizardContext.name + ".wizard.cancelConfirm",
				"wizard.cancelConfirm",
			])}
			onConfirm={() => wizardContext.events.handler("reset")()}
		>
			<Button
				type={"ghost"}
				size={"middle"}
				danger
				icon={<CancelIcon/>}
				children={t("common.wizard.cancel")}
			/>
		</Popconfirm>
	);
};
