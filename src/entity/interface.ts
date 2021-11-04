export interface IEntityContext<TEntity> {
	readonly entity: TEntity;
	update: (entity?: TEntity) => void;
}
