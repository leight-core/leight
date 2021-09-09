import {FC, ReactNode} from "react";
import {Template} from "./Template";

export interface IPreviewTemplateProps {
	title: string;
	icon: ReactNode;
	translation?: boolean;
}

export const PreviewTemplate: FC<IPreviewTemplateProps> = ({icon, title, translation = true, children}) => {
	return <Template
		title={translation ? title + ".preview" : title}
		icon={icon}
		translation={translation}
		span={20}
	>
		{children}
	</Template>;
};
