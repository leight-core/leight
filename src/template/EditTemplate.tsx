import {FC, ReactNode} from "react";
import {Template} from "./Template";

export interface IEditTemplateProps {
	title: string;
	icon: ReactNode;
}

export const EditTemplate: FC<IEditTemplateProps> = ({icon, title, children}) => {
	return <Template
		title={title + ".edit"}
		icon={icon}
	>
		{children}
	</Template>;
};
