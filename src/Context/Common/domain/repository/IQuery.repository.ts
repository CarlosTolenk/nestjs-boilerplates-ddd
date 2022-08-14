export interface IQueryRepository<T, TEntity> {
  find(param: T): TEntity;
}
