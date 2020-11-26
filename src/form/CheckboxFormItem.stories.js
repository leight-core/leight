import {Form} from "antd";
import CheckboxFormItem from "./CheckboxFormItem";

export default {
	title: "Leight/Form/Checkbox Sandbox",
	component: CheckboxFormItem,
};

export const CheckboxSandbox = () => <CheckboxFormItem name={"checkbox"}/>;
CheckboxSandbox.decorators = [Story => (
	<Form>
		<Story/>
	</Form>
)];
