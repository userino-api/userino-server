type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type EmptyObject = Record<string, never>
