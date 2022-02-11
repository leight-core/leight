import {
	FormContextProvider,
	IFormContext,
	IFormError,
	IFormErrorHandler,
	IFormErrorMap,
	IFormInitialMapper,
	IFormMutationMapper,
	IFormOnFailure,
	IFormOnSuccess,
	IMutationHookCallback,
	INavigate,
	IQueryParams,
	ItemGroupContextProvider,
	IToError,
	LoaderIcon,
	useBlockContext,
	useFormBlockContext,
	useFormContext,
	useNavigate,
	useOptionalDrawerContext
} from "@leight-core/leight";
import {Form as CoolForm, FormProps, message, Spin} from "antd";
import isCallable from "is-callable";
import React, {PropsWithChildren} from "react";
import {useTranslation} from "react-i18next";
import {useMutation} from "react-query";

export interface IFormProps<TQuery extends IQueryParams, TRequest, TResponse> extends Partial<FormProps> {
	translation?: string;
	/**
	 * What to do on form submit.
	 */
	useMutation?: IMutationHookCallback<TQuery, TRequest, TResponse>;
	mutationQuery?: TQuery;
	/**
	 * Map form data to mutation data.
	 */
	toMutation?: IFormMutationMapper<any, TRequest>;
	/**
	 * Map data to the initial state of the form (if any).
	 */
	toForm?: IFormInitialMapper<any>;
	/**
	 * Called when a form is successfully committed.
	 */
	onSuccess?: IFormOnSuccess<any, TResponse>;
	/**
	 * Called when an error occurs.
	 */
	onFailure?: IFormOnFailure<any>;
	/**
	 * Map error from outside to a state in the form (like a general error or a field error).
	 */
	toError?: (error: IToError<any, any>) => IFormErrorMap<any>;
	closeDrawer?: boolean;
}

const usePassThroughMutation = () => useMutation<any, any, any, any>(values => {
	return new Promise(resolve => resolve(values));
});

const FormInternal = <TQuery extends IQueryParams, TRequest, TResponse>(
	{
		useMutation = usePassThroughMutation,
		mutationQuery,
		toMutation = values => values,
		toForm = () => null as any,
		onSuccess = () => null,
		toError = () => ({}),
		onFailure,
		closeDrawer = true,
		children,
		...props
	}: PropsWithChildren<IFormProps<TQuery, TRequest, TResponse>>) => {
	const formContext = useFormContext();
	const blockContext = useBlockContext();
	const formBlockContext = useFormBlockContext();
	const drawerContext = useOptionalDrawerContext();
	const doNavigate = useNavigate();
	const {t} = useTranslation();

	const mutation = useMutation(mutationQuery, {
		onSettled: () => {
			blockContext.unblock();
			formBlockContext.unblock();
		}
	});

	const navigate: INavigate = (href: string, query) => {
		blockContext.block();
		doNavigate(href, query);
	};

	function handleError(formError: IFormError | IFormErrorHandler<any, any>, error: any, formContext: IFormContext) {
		let handle = formError;
		if (!isCallable(handle)) {
			handle = () => formContext.setErrors({
				errors: [
					(formError as IFormError),
				],
			});
		}
		(handle as IFormErrorHandler<any, any>)({error, formContext});
	}

	onFailure = onFailure || (({error, formContext}) => {
		const map = toError({error, formContext});
		const formError = map[error];
		const general = map["general"];
		formError && handleError(formError, error, formContext);
		!formError && general && handleError(general, error, formContext);
		message.error(t("error." + error));
	});

	return <CoolForm
		form={formContext.form}
		colon={false}
		size={"large"}
		onFinish={values => {
			blockContext.block();
			formBlockContext.block();
			mutation.mutate(toMutation(values), {
				onSuccess: response => {
					blockContext.unblock();
					formBlockContext.unblock();
					closeDrawer && drawerContext?.hide();
					onSuccess({navigate, values, response, formContext});
				},
				onError: error => onFailure && onFailure({error: (error && error.response && error.response.data) || error, formContext}),
			});
		}}
		labelCol={{span: 8}}
		labelAlign={"left"}
		wrapperCol={{span: 24}}
		scrollToFirstError
		initialValues={toForm()}
		{...props}
	>
		<Spin indicator={<LoaderIcon/>} spinning={formBlockContext.isBlocked()}>
			{children}
		</Spin>
	</CoolForm>;
};

export function Form<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>({translation, ...props}: PropsWithChildren<IFormProps<TQuery, TRequest, TResponse>>): JSX.Element {
	return <FormContextProvider translation={translation}>
		<ItemGroupContextProvider prefix={[]}>
			<FormInternal<TQuery, TRequest, TResponse> {...props}/>
		</ItemGroupContextProvider>
	</FormContextProvider>;
}
