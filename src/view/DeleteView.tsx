import {Button, Card, Divider, message, Result, Space} from "antd";
import {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {DeleteItemIcon} from "../icon/DeleteItemIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {useRouterContext} from "../router/RouterContext";
import {IDeleteCallback, IServerEvents} from "../server/interface";
import {ServerEvents} from "../server/ServerEvents";
import {IDeleteOnSuccess} from "./interface";
import {useViewContext} from "./ViewContext";

export interface IDeleteViewProps<TResponse = any> {
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
	title?: ReactNode
	/**
	 * Optional data just used for translation interpolation.
	 */
	data?: any
	/**
	 * Handle delete of the item.
	 */
	onDelete: IDeleteCallback<TResponse>,
	/**
	 * Optional delete params.
	 */
	params?: Params,
	/**
	 * Placeholder title rendered during fetch if needed.
	 */
	placeholderTitle?: string
	/**
	 * Exposed events of delete action.
	 */
	events?: IServerEvents<TResponse>
	/**
	 * Exposed events of delete action.
	 */
	onSuccess?: IDeleteOnSuccess<TResponse>
}

export const DeleteView = <TResponse extends unknown = any>(
	{
		translation,
		title,
		data = {},
		params,
		onDelete,
		events = ServerEvents(),
		onSuccess = () => null,
	}: IDeleteViewProps<TResponse>) => {
	const discoveryContext = useDiscoveryContext();
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	const navigate = useRouterContext().useNavigate();
	const viewContext = useViewContext();
	return (
		<Card title={title || viewContext.title || t(translation + ".title")}>
			<Result
				status={"warning"}
				title={t(translation + ".title", {data})}
				subTitle={t(translation + ".subtitle", {data})}
				extra={
					<Space split={<Divider type={"vertical"}/>} size={"large"}>
						<Button type={"primary"} danger icon={<DeleteItemIcon/>} size={"large"} children={t(translation + ".confirm", {data})} onClick={() => {
							layoutContext.blockContext.block();
							onDelete(discoveryContext, params)
								.on("response", data => {
									onSuccess(navigate, data);
								})
								.on("http500", () => {
									message.error(t(translation + ".error"));
								})
								.on("done", () => {
									layoutContext.blockContext.unblock();
								})
								.chain(events);
						}}/>
					</Space>
				}
			/>
		</Card>
	);
};
