import {Button, Card, Divider, message, Result, Space} from "antd";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {FetchBlocking} from "../component/FetchBlocking";
import {IFetchMapper} from "../component/interface";
import {DeleteItemIcon} from "../icon/DeleteItemIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {useRouterContext} from "../router/RouterContext";
import {IDeleteCallback, IGetCallback, IServerEvents} from "../server/interface";
import {Events} from "../utils/Events";
import {IDeleteOnSuccess} from "./interface";

export interface IDeleteViewProps<TData> {
	/**
	 * Base translation key (for example common.delete).
	 *
	 * Internally uses:
	 * - .title
	 * - .subtitle
	 * - .confirm
	 * - .error
	 * - .placeholder
	 */
	translation: string
	/**
	 * Fetch method if there are some external data needed.
	 */
	fetch?: IGetCallback
	/**
	 * Optional parameters used for calling remote fetch (if needed).
	 */
	fetchParams?: Params
	/**
	 * Fetch mapper used to map data into layout context.
	 */
	fetchMapper?: IFetchMapper<TData>
	/**
	 * Handle delete of the item.
	 */
	deleteCallback: IDeleteCallback,
	/**
	 * Optional delete params.
	 */
	deleteParams?: Params,
	/**
	 * Placeholder title rendered during fetch if needed.
	 */
	placeholderTitle?: string
	/**
	 * Called on successful delete.
	 */
	onSuccess?: IDeleteOnSuccess<TData>
}

const DeleteViewPlaceholder = ({translation}) => {
	const {t} = useTranslation();
	return (
		<Card title={<><BackLink/>&nbsp;{t(translation + ".placeholder")}</>}>
			<Result
				status={"warning"}
				title={t(translation + ".placeholder")}
			/>
		</Card>
	);
};

export const DeleteView = <TData extends Object>(
	{
		translation,
		fetch = (_, events) => {
			events.handler("success")({});
			events.handler("done")();
			return {cancel: () => null, token: null as any} as any;
		},
		fetchMapper = data => data,
		fetchParams,
		deleteCallback,
		onSuccess = () => null,
	}: IDeleteViewProps<TData>) => {
	const appContext = useAppContext();
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	const navigate = useRouterContext().useNavigate();
	return (
		<FetchBlocking<TData>
			fetch={fetch}
			mapper={fetchMapper}
			params={fetchParams}
			placeholder={() => <DeleteViewPlaceholder translation={translation}/>}
		>
			{data => (
				<Card title={<><BackLink/>&nbsp;{t(translation + ".title", {data})}</>}>
					<Result
						status={"warning"}
						title={t(translation + ".title", {data})}
						subTitle={t(translation + ".subtitle", {data})}
						extra={
							<Space split={<Divider type={"vertical"}/>} size={"large"}>
								<Button type={"primary"} danger icon={<DeleteItemIcon/>} size={"large"} children={t(translation + ".confirm", {data})} onClick={() => {
									layoutContext.blockContext.block();
									deleteCallback(
										appContext,
										Events<IServerEvents>()
											.on("success", (data) => {
												onSuccess(navigate, data);
											})
											.on("http500", () => {
												message.error(t(translation + ".error"));
											})
											.on("done", () => {
												layoutContext.blockContext.unblock();
											})
											.on("catch", () => {
												layoutContext.blockContext.unblock();
											})
									);
								}}/>
							</Space>
						}
					/>
				</Card>
			)}
		</FetchBlocking>
	);
};
