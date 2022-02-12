export interface IEntityContext<TEntity> {
	entity: TEntity;

	optional(): TEntity | undefined | null;

	required(): TEntity;

	update(entity?: TEntity | null): void;
}
