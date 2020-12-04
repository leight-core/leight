import {Form} from "antd";
import {FormListProps} from "antd/lib/form";
import {NamePath} from "rc-field-form/lib/interface";
import React, {FC} from "react";

type TFormListProps = Partial<FormListProps> & Pick<FormListProps, "children">

export interface IFormList extends TFormListProps {
	field: NamePath
}

export const FormList: FC<IFormList> = ({field, ...props}) => {
	return <Form.List name={field} {...props} children={props.children}/>;
};
