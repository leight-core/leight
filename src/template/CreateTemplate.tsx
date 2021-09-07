import {FC, ReactNode} from "react";
import {Template} from "./Template";

export interface ICreateTemplateProps {
	title: string;
	icon: ReactNode;
	translation?: boolean;
}

export const CreateTemplate: FC<ICreateTemplateProps> = ({icon, title, translation = true, children}) => {
	return <Template
		title={title + ".create"}
		icon={icon}
		translation={translation}
	>
		{children}
	</Template>;
};
