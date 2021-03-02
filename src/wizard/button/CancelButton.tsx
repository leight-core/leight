import {Button, Popconfirm} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {CancelIcon} from "../../icon/CancelIcon";
import {useModuleContext} from "../../module/ModuleContext";
import {useWizardContext} from "../WizardContext";

export interface ICancelButtonProps {
}

export const CancelButton: FC<ICancelButtonProps> = () => {
	const {t} = useTranslation();
	const wizardContext = useWizardContext();
	const moduleContext = useModuleContext();
	return (
		<Popconfirm
			okText={t("common.yes")}
			cancelText={t("common.no")}
			title={t([
				moduleContext.tid(wizardContext.name + ".wizard.cancelConfirm"),
				moduleContext.tid("wizard.cancelConfirm"),
				"wizard.cancelConfirm",
			])}
			onConfirm={() => wizardContext.events.handler("reset")()}
		>
			<Button
				type={"ghost"}
				danger
				icon={<CancelIcon/>}
				children={t("common.wizard.cancel")}
			/>
		</Popconfirm>
	);
};
