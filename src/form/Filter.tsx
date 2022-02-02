import {CloseCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {Centered, DrawerButton, DrawerContext, Form, IDrawerButtonProps, IFormProps, Submit, useFormContext} from "@leight-core/leight";
import {Button, Divider, Space} from "antd";
import {FC, PropsWithChildren} from "react";
import {useTranslation} from "react-i18next";

interface IFilterInternalProps {
	onFilter: (filter?: any) => void;
	onClear: () => void;
}

const FilterInternal: FC<IFilterInternalProps> = ({onFilter, onClear, children}) => {
	const {t} = useTranslation();
	const formContext = useFormContext();
	return <>
		{children}
		<Divider/>
		<Centered>
			<Space align={"baseline"} split={<Divider type={"vertical"}/>}>
				<Button
					size={"middle"}
					onClick={() => {
						formContext.reset();
						onFilter(undefined);
						onClear();
					}}
					icon={<CloseCircleOutlined/>}
				>
					{t("common.filter.clear")}
				</Button>
				<Submit
					icon={<SearchOutlined/>}
					label={"common.filter.submit"}
				/>
			</Space>
		</Centered>
	</>;
};

export interface IFilterProps<TFilter = any> {
	filter?: TFilter;
	translation: string;
	onFilter: (filter?: TFilter) => void;
	onClear: () => void;
	drawerButtonProps?: IDrawerButtonProps;
	formProps?: IFormProps<any, TFilter, TFilter>;
}

export type IFilterWithoutTranslationProps<TFilter = any> = Omit<IFilterProps<TFilter>, "translation">;

export function Filter<TFilter = any, >({filter, translation, onFilter, onClear, drawerButtonProps, formProps, ...props}: PropsWithChildren<IFilterProps<TFilter>>): JSX.Element {
	return <DrawerButton
		icon={<SearchOutlined/>}
		type={"link"}
		size={"small"}
		title={translation + ".filter.title"}
		label={translation + ".filter.title"}
		width={600}
		{...drawerButtonProps}
	>
		<DrawerContext.Consumer>
			{drawerContext => <Form<any, TFilter, TFilter>
				toForm={() => filter}
				onSuccess={({response}) => {
					onFilter(response);
					drawerContext.setVisible(false);
				}}
				{...formProps}
			>
				<FilterInternal
					onFilter={onFilter}
					onClear={() => {
						drawerContext && drawerContext.setVisible(false);
						onClear && onClear();
					}}
					{...props}
				/>
			</Form>}
		</DrawerContext.Consumer>
	</DrawerButton>;
}
