import React from "react";
import {CheckboxItem} from "./CheckboxItem";
import {Form} from "./Form";

export default {
	title: "Leight/Form/CheckboxItem Sandbox",
	component: CheckboxItem,
};

export const CheckboxSandbox = () => <CheckboxItem field={"checkbox"}/>;
CheckboxSandbox.decorators = [Story => (
	<Form name={"story"} onSubmit={() => null}>
		<Story/>
	</Form>
)];
