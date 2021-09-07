import {FC, ReactNode} from "react";
import {Template} from "./Template";

export interface IEditTemplateProps {
	title: string;
	icon: ReactNode;
	translation?: boolean;
}

export const EditTemplate: FC<IEditTemplateProps> = ({icon, title, translation = true, children}) => {
	return <Template
		title={title + ".edit"}
		icon={icon}
		translation={translation}
	>
		{children}
	</Template>;
};
