import {Button, Card, Divider, message, Result, Space} from "antd";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {BackLink} from "../component/BackLink";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {FetchBlocking} from "../fetch/FetchBlocking";
import {DeleteItemIcon} from "../icon/DeleteItemIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {useRouterContext} from "../router/RouterContext";
import {IDeleteCallback, IGetCallback} from "../server/interface";
import {FakeServerEvents} from "../server/ServerEvents";
import {IDeleteOnSuccess} from "./interface";

export interface IDeleteViewProps<TFetch = any, TResponse = TFetch> {
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
	fetch?: IGetCallback<TFetch>
	/**
	 * Optional parameters used for calling remote fetch (if needed).
	 */
	fetchParams?: Params
	/**
	 * Handle delete of the item.
	 */
	deleteCallback: IDeleteCallback<TResponse>,
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
	onSuccess?: IDeleteOnSuccess<TResponse>
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

export const DeleteView = <TFetch extends unknown = any, TResponse extends unknown = TFetch>(
	{
		translation,
		fetch = () => FakeServerEvents(),
		fetchParams,
		deleteCallback,
		onSuccess = () => null,
	}: IDeleteViewProps<TFetch, TResponse>) => {
	const discoveryContext = useDiscoveryContext();
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	const navigate = useRouterContext().useNavigate();
	return (
		<FetchBlocking<TFetch>
			translation={translation}
			fetch={fetch}
			params={fetchParams}
			placeholder={() => <DeleteViewPlaceholder translation={translation}/>}
			children={data => (
				<Card title={<><BackLink/>&nbsp;{t(translation + ".title", {data})}</>}>
					<Result
						status={"warning"}
						title={t(translation + ".title", {data})}
						subTitle={t(translation + ".subtitle", {data})}
						extra={
							<Space split={<Divider type={"vertical"}/>} size={"large"}>
								<Button type={"primary"} danger icon={<DeleteItemIcon/>} size={"large"} children={t(translation + ".confirm", {data})} onClick={() => {
									layoutContext.blockContext.block();
									deleteCallback(discoveryContext)
										.on("response", data => {
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
										});
								}}/>
							</Space>
						}
					/>
				</Card>
			)}
		/>
	);
};
