import {FC, ReactNode} from "react";
import {Template} from "./Template";

export interface ICreateTemplateProps {
	title: string;
	icon: ReactNode;
}

export const CreateTemplate: FC<ICreateTemplateProps> = ({icon, title, children}) => {
	return <Template
		title={title + ".create"}
		icon={icon}
	>
		{children}
	</Template>;
};