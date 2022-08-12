export interface UseCases<T> {
  run(valueObject: T): Promise<void>;
}
