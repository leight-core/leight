import {FC, ReactNode} from "react";
import {Template} from "./Template";

export interface ICreateTemplateProps {
	title: string;
	icon: ReactNode;
	translation?: boolean;
}

export const CreateTemplate: FC<ICreateTemplateProps> = ({icon, title, translation = true, children}) => {
	return <Template
		title={translation ? title + ".create" : title}
		icon={icon}
		translation={translation}
	>
		{children}
	</Template>;
};
