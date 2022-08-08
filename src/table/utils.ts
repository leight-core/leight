import {UseQueryResult} from "@tanstack/react-query";
import {ColumnFilterItem} from "antd/lib/table/interface";

export function toFilters<TResponse>(query: UseQueryResult<TResponse>, map: (data: TResponse) => ColumnFilterItem[]): ColumnFilterItem[] {
	return query.isSuccess ? map(query.data) : [];
}
