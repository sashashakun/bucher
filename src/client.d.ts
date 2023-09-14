// Permit unused imports for d.ts as it is required to have autocomplete for inline style in JSX
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    // Permit arbitrary custom properties to be passed in styles
    [index: `--${string}`]: string;
  }
}
