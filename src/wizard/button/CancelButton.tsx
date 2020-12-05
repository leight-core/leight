import {Button, Popconfirm} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {CancelIcon} from "../../icon/CancelIcon";
import {useModuleContext} from "../../module/ModuleContext";
import {useWizardContext} from "../WizardContext";

export interface ICancelButton {
}

export const CancelButton: FC<ICancelButton> = () => {
	const {t} = useTranslation();
	const wizardContext = useWizardContext();
	const moduleContext = useModuleContext();
	return (
		<Popconfirm
			okText={t("common.yes")}
			cancelText={t("common.no")}
			title={moduleContext.t("wizard.cancelConfirm")}
			onConfirm={() => wizardContext.events.call("reset")}
		>
			<Button
				type={"ghost"}
				size={"large"}
				danger
				icon={<CancelIcon/>}
				children={moduleContext.t("wizard.cancel")}
			/>
		</Popconfirm>
	);
};
