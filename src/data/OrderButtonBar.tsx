import {CancelOrderButton, OrderButton} from "@leight-core/leight";
import {Divider, Space, SpaceProps} from "antd";

export interface IOrderButtonBarProps<TOrderBy> extends Partial<SpaceProps> {
	showCancelButton?: boolean;
	buttons: (keyof TOrderBy)[];
}

export const OrderButtonBar = <TOrderBy, >({showCancelButton = true, buttons, ...props}: IOrderButtonBarProps<TOrderBy>) => {
	return <Space split={<Divider type={"vertical"}/>} size={"small"} {...props}>
		{buttons.map(item => <OrderButton<TOrderBy> key={item as string} orderBy={item}/>)}
		{showCancelButton && <CancelOrderButton/>}
	</Space>;
};
