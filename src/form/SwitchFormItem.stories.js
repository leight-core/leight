import {Form} from "antd";
import SwitchFormItem from "./SwitchFormItem";

export default {
	title: "Leight/Form/Switch Sandbox",
	component: SwitchFormItem,
};

export const SwitchSandbox = () => <SwitchFormItem name={"switch"}/>;
SwitchSandbox.decorators = [Story => (
	<Form>
		<Story/>
	</Form>
)];
