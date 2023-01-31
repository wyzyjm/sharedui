/**
 * An array of exactly 1 item of `Ta` anywhere in the array and the rest of
 * them being of type `Tb`.
 * @todo Currently supports up to N = 6 items of `Tb` between the `Ta` item
 *       and either end of the array. We're currently looking for a better
 *       implementation of this enforcement.
 * @warning Using a large `N` may impact the transpile performance.
 */
export type ExactlyOne<Ta, Tb> =
  [...AtMostNTuple<Tb, 6>, Ta, ...Tb[]] | [...Tb[], Ta, ...AtMostNTuple<Tb, 6>];

/** Tuple having exactly `N` items of type `T`. */
export type NTuple<T, N extends number> = NTupleI<T, N, []>;
type NTupleI<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : NTupleI<T, N, [T, ...R]>;

/** Tuple having at least `N` items of type `T`. */
export type AtLeastNTuple<T, N extends number> = [...NTuple<T, N>, ...T[]];

/**
 * Tuple having at most `N` (at least 0) items of type `T`.
 * @warning Using a large `N` may impact the transpile performance.
 */
export type AtMostNTuple<T, N extends number> = AtMostNTupleI<T, N, []>;
type AtMostNTupleI<T, N extends number, R extends unknown[]> =
  R["length"] extends N
  ? NTuple<T, N>
  : NTuple<T, R["length"]> | AtMostNTupleI<T, N, [T, ...R]>;

export type Maybe<T> = T | undefined;