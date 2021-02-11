import {message} from "antd";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";
import {IGetCallback, IServerEvents} from "../server/interface";
import {Events} from "../utils/Events";
import {useViewContext} from "../view/ViewContext";
import {Fetch, IFetchProps} from "./Fetch";

export interface IFetchBlockingProps<TData> extends Omit<IFetchProps<TData>, "fetch"> {
	/**
	 * Fetch callback to get data.
	 */
	fetch: IGetCallback
	/**
	 * Optional params for fetch callback.
	 */
	params?: Params
	/**
	 * Mapper used to map fetched data into layout context's data.
	 */
	mapper?: (data: TData) => any
}

export const FetchBlocking = <TData extends Object>({fetch, mapper = data => data, params, deps = [], children, ...props}: IFetchBlockingProps<TData>) => {
	const appContext = useAppContext();
	const viewContext = useViewContext();
	const layoutContext = useLayoutContext();
	const moduleContext = useModuleContext();
	return (
		<Fetch<TData>
			fetch={(setData) => {
				setData(null);
				const token = fetch(
					appContext,
					Events<IServerEvents>()
						.on("request", () => {
							viewContext.blockContext.block();
						})
						.on<TData>("success", data => {
							layoutContext.setData(mapper(data));
							setData(data);
						})
						.on("catch", _ => {
							viewContext.blockContext.unblock(true);
							message.error(moduleContext.t("error-occurred"));
						})
						.on("done", _ => {
							viewContext.blockContext.unblock();
						}),
					params,
				);
				return () => token.cancel();
			}}
			children={children}
			deps={[params].concat(deps)}
			{...props}
		/>
	);
};
