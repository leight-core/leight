export interface IEntityContext<TEntity> {
	optional: () => TEntity | undefined | null;
	required: () => TEntity;
	update: (entity?: TEntity | null) => void;
}
