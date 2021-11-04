import {EntityContext} from "@leight-core/leight";
import {PropsWithChildren, useState} from "react";

export interface IEntityProviderProps<TEntity> {
	defaultEntity?: TEntity;
}

export const EntityProvider = <TEntity, >({defaultEntity, children}: PropsWithChildren<IEntityProviderProps<TEntity>>) => {
	const [entity, update] = useState<TEntity | undefined>(defaultEntity);
	return <EntityContext.Provider
		value={{
			entity,
			update,
		}}
	>
		{children}
	</EntityContext.Provider>;
};
