export interface IQueryRepository<T> {
  findById(id: string): Promise<T | null>;
}
