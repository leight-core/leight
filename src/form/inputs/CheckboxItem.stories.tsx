import React from "react";
import {StoryApp} from "../../storybook/StoryApp";
import {Form} from "../Form";
import {CheckboxItem} from "./CheckboxItem";

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
