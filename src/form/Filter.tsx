import {CloseCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {Centered, DrawerButton, DrawerContext, Form, IDrawerButtonProps, IFormProps, Submit, useFilterContext, useFormContext} from "@leight-core/leight";
import {Button, Divider, Space} from "antd";
import {FC, PropsWithChildren} from "react";
import {useTranslation} from "react-i18next";

type IFilterInternalProps = PropsWithChildren<{
	onClear: () => void;
}>

const FilterInternal: FC<IFilterInternalProps> = ({onClear, ...props}) => {
	const {t} = useTranslation();
	const formContext = useFormContext();
	const filterContext = useFilterContext();
	return <>
		{props.children}
		<Divider/>
		<Centered>
			<Space align={"baseline"} split={<Divider type={"vertical"}/>}>
				<Button
					size={"middle"}
					onClick={() => {
						formContext.reset();
						filterContext.setFilter({});
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
	translation: string;
	onClear?: () => void;
	drawerButtonProps?: IDrawerButtonProps;
	formProps?: IFormProps<any, TFilter, TFilter>;
}

export type IFilterWithoutTranslationProps<TFilter = any> = Omit<IFilterProps<TFilter>, "translation">;

export function Filter<TFilter = any, >({translation, onClear, drawerButtonProps, formProps, ...props}: PropsWithChildren<IFilterProps<TFilter>>): JSX.Element {
	const {t} = useTranslation();
	const filterContext = useFilterContext();
	return <Space align={"baseline"} split={<Divider type={"vertical"}/>}>
		<DrawerButton
			icon={<SearchOutlined/>}
			type={"link"}
			size={"small"}
			title={translation + ".filter.title"}
			label={translation + ".filter.title"}
			width={750}
			{...drawerButtonProps}
		>
			<DrawerContext.Consumer>
				{drawerContext => <Form<any, TFilter, TFilter>
					layout={"vertical"}
					toForm={() => filterContext.filter}
					onSuccess={({response}) => {
						filterContext.setFilter(response);
						drawerContext.setVisible(false);
					}}
					{...formProps}
				>
					<FilterInternal
						onClear={() => {
							drawerContext && drawerContext.setVisible(false);
							onClear && onClear();
						}}
						{...props}
					/>
				</Form>}
			</DrawerContext.Consumer>
		</DrawerButton>
		<Button
			type={"link"}
			size={"small"}
			onClick={() => {
				filterContext.setFilter({});
				onClear && onClear();
			}}
			icon={<CloseCircleOutlined/>}
		>
			{t("common.filter.clear")}
		</Button>
	</Space>;
}
