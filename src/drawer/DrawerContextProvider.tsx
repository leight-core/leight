import {DrawerContext} from "@leight-core/leight";
import {FC, ReactNode, useState} from "react";
import ReactMarkdown from "react-markdown";

export interface IDrawerContextProviderProps {
}

export const DrawerContextProvider: FC<IDrawerContextProviderProps> = ({children}) => {
	const defaultWidth = 450;
	const [visible, setVisible] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(defaultWidth);
	const [content, setContent] = useState<ReactNode>();
	return <DrawerContext.Provider
		value={{
			visible,
			setVisible,
			content,
			setContent,
			width,
			setWidth,
			display: (content, width) => {
				setContent(content);
				setWidth(width ? width : defaultWidth);
				setVisible(true);
			},
			markdown: (content, width) => {
				setContent(<ReactMarkdown>{content}</ReactMarkdown>);
				setWidth(width ? width : defaultWidth);
				setVisible(true);
			},
		}}
	>
		{children}
	</DrawerContext.Provider>;
};
