import React from "react";
import {StoryApp} from "../storybook/StoryApp";
import {CheckboxItem} from "./CheckboxItem";
import {Form} from "./Form";

export default {
	title: "Leight/Form/CheckboxItem Sandbox",
	component: CheckboxItem,
};

export const CheckboxSandbox = () => <CheckboxItem field={"checkbox"}/>;
CheckboxSandbox.decorators = [Story => (
	<StoryApp>
		<Form name={"story"} onSubmit={() => null}>
			<Story/>
		</Form>
	</StoryApp>
)];
