import Checkbox from "./Checkbox";
import {Form} from "./Form";

export default {
	title: "Leight/Form/Checkbox Sandbox",
	component: Checkbox,
};

export const CheckboxSandbox = () => <Checkbox name={"checkbox"}/>;
CheckboxSandbox.decorators = [Story => (
	<Form name={"story"} onFinish={() => null}>
		<Story/>
	</Form>
)];
