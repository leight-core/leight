import {Form} from "./Form";
import Switch from "./Switch";

export default {
	title: "Leight/Form/Switch Sandbox",
	component: Switch,
};

export const SwitchSandbox = () => <Switch name={"switch"}/>;
SwitchSandbox.decorators = [Story => (
	<Form name={"story"} onFinish={() => null}>
		<Story/>
	</Form>
)];
