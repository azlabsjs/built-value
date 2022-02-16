export interface BuilderInterface<T extends object> {
  /**
   * @description Interface definition for building an instance of T
   * @param params [[object]]
   */
  build(params: object): T;

  /**
   * @description Interface definitions for rebuilding an instance of T
   * @param instance [[T]]
   * @param params [[object]]
   */
  rebuild(instance: T, params: Partial<T>): T;
}
