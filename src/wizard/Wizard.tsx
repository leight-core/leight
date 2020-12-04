import {Button, Divider, Popconfirm, Space, Steps} from "antd";
import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {SubmitButton} from "../form/SubmitButton";
import {BackIcon} from "../icon/BackIcon";
import {CancelIcon} from "../icon/CancelIcon";
import {ForwardIcon} from "../icon/ForwardIcon";
import {useModuleContext} from "../module/ModuleContext";
import {IEvents} from "../utils/Events";

export interface IStep {
	id: string
	component: JSX.Element
}

export interface IWizard {
	name: string
	events: IEvents
	steps: IStep[]
}

export const Wizard: FC<IWizard> = (
	{
		name,
		events,
		steps
	}) => {
	const [current, setCurrent] = useState(0);
	const {t} = useTranslation();
	const moduleContext = useModuleContext();
	return (
		<>
			<Steps current={current} size={"default"}>
				{steps.map(item => (
					<Steps.Step
						key={item.id}
						title={t("wizard." + name + ".step." + item.id + ".title")}
						description={t("wizard." + name + ".step." + item.id + ".description")}
					/>
				))}
			</Steps>
			<Divider type={"horizontal"}/>
			{steps[current].component}
			<Divider type={"horizontal"}/>
			<Space split={<Divider type={"vertical"}/>} size={"large"}>
				<Popconfirm
					okText={t("common.yes")}
					cancelText={t("common.no")}
					title={t(moduleContext.id + ".register.cancelConfirm")}
					onConfirm={() => events.call("reset")}
				>
					<Button
						type={"ghost"}
						size={"large"}
						danger
						icon={<CancelIcon/>}
						children={t(moduleContext.id + ".register.cancel")}
					/>
				</Popconfirm>
				{current > 0 && (
					<Button
						icon={<BackIcon/>}
						size={"large"}
						onClick={() => {
							setCurrent(step => step - 1);
							events.call("previous", current);
						}}
						children={t(moduleContext.id + ".wizard.previous")}
					/>
				)}
				{current < steps.length - 1 && (
					<SubmitButton title={moduleContext.tid(".wizard.finish")} noStyle icon={<ForwardIcon/>}/>
				)}
				{current === steps.length - 1 && (
					<SubmitButton title={moduleContext.tid(".wizard.finish")} noStyle/>
				)}
			</Space>
		</>
	);
};
