export interface IPersistenceRepository<T> {
  persist(model: T): Promise<void>;
}
