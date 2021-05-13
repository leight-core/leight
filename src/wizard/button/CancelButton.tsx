import {Button, Popconfirm} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {CancelIcon} from "../../icon/CancelIcon";
import {useWizardButtonContext} from "../useWizardButtonContext";
import {useWizardContext} from "../WizardContext";

export interface ICancelButtonProps {
}

export const CancelButton: FC<ICancelButtonProps> = () => {
	const {t} = useTranslation();
	const wizardContext = useWizardContext();
	const buttonContext = useWizardButtonContext();
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
				disabled={buttonContext.isDisabled("cancel")}
				danger
				icon={<CancelIcon/>}
				children={t("common.wizard.cancel")}
			/>
		</Popconfirm>
	);
};
