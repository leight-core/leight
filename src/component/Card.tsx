import {Card as CoolCard, CardProps as CoolCardProps} from "antd";
import {FC} from "react";
import {isMobile} from "react-device-detect";

export interface ICardProps extends Partial<CoolCardProps> {
}

export const Card: FC<ICardProps> = props => {
	return <CoolCard
		bodyStyle={isMobile ? {padding: "8px"} : undefined}
		headStyle={isMobile ? {minHeight: "32px"} : undefined}
		{...props}
	/>;
};
