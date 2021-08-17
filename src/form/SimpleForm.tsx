import {CommonForm, FakeServerEvents, ICommonFormProps} from "@leight-core/leight";

export interface ISimpleFormProps<TFormValues = any, TRequest = TFormValues, TResponse = TRequest> extends Partial<ICommonFormProps<TFormValues, TRequest, TResponse>> {
}

/**
 * Simple form does fake post event (thus does nothing) and is useful for wrapping
 * things into a form (but not using it directly to post data). Although, it internally uses
 * CommonForm, so everything just works.
 */
export const SimpleForm = <TFormValues extends any = any, TRequest extends any = TFormValues, TResponse extends any = TRequest>(props: ISimpleFormProps<TFormValues, TRequest, TResponse>) => {
	return <CommonForm post={() => FakeServerEvents()} {...props}/>;
};
