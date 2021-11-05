import {EntityContext} from "@leight-core/leight";
import {PropsWithChildren, useState} from "react";

export interface IEntityProviderProps<TEntity> {
	defaultEntity?: TEntity;
}

export const EntityProvider = <TEntity, >({defaultEntity, children}: PropsWithChildren<IEntityProviderProps<TEntity>>) => {
	const [entity, update] = useState<TEntity | undefined | null>(defaultEntity);
	return <EntityContext.Provider
		value={{
			optional: () => entity,
			required: () => {
				if (!entity) {
					throw new Error("Requested an Entity which is not set.");
				}
				return entity;
			},
			update,
		}}
	>
		{children}
	</EntityContext.Provider>;
};
