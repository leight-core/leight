import {FC, ReactNode, useState} from "react";
import ReactMarkdown from "react-markdown";
import {DrawerContext} from "./DrawerContext";

export interface IDrawerContextProviderProps {
}

export const DrawerContextProvider: FC<IDrawerContextProviderProps> = ({children}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [content, setContent] = useState<ReactNode>();
	return (
		<DrawerContext.Provider
			value={{
				visible,
				setVisible,
				content,
				setContent,
				display: content => {
					setContent(content);
					setVisible(true);
				},
				markdown: content => {
					setContent(<ReactMarkdown children={content}/>);
					setVisible(true);
				},
			}}
			children={children}
		/>
	);
};
