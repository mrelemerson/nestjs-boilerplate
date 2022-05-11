declare module 'items-promise' {
  export function serial<T, E>(
    items: T[],
    fn: (item: T) => Promise<E>,
  ): Promise<E>;

  export function parallel<T, E>(
    items: T[],
    fn: (item: T) => Promise<E>,
  ): Promise<E[]>;
}
