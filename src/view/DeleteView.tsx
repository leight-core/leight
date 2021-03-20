import {Button, Card, Divider, message, Result, Space} from "antd";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {BackLink} from "../component/BackLink";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {DeleteItemIcon} from "../icon/DeleteItemIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {useRouterContext} from "../router/RouterContext";
import {IDeleteCallback, IServerEvents} from "../server/interface";
import {ServerEvents} from "../server/ServerEvents";
import {IDeleteOnSuccess} from "./interface";

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

export const DeleteViewPlaceholder = ({translation}) => {
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

export const DeleteView = <TResponse extends unknown = any>(
	{
		translation,
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
	return (
		<Card title={<><BackLink/>&nbsp;{t(translation + ".title", {data})}</>}>
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
								.on("catch", () => {
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
