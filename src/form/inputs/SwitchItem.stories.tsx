import React from "react";
import {StoryApp} from "../../storybook/StoryApp";
import {Form} from "../Form";
import {SwitchItem} from "./SwitchItem";

export default {
	title: "Leight/Form/SwitchItem Sandbox",
	component: SwitchItem,
};

export const SwitchSandbox = () => <SwitchItem field={"switch"}/>;
SwitchSandbox.decorators = [Story => (
	<StoryApp>
		<Form name={"story"} onSubmit={() => null}>
			<Story/>
		</Form>
	</StoryApp>
)];
