import { BaseComponent } from "@control.ts/signals"

export const classBcToFn =
  <
    C extends BaseComponent,
    A extends readonly unknown[],
  >(Class: {
    new (...args: A): C
  }) =>
  (...args: A) =>
    new Class(...args)
