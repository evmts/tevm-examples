// `tsc` on the command line does not load TypeScript language-service plugins,
// so `@tevm/ts-plugin` cannot type this import during `pnpm typecheck`.
// Editors with the plugin enabled still see the full ABI-derived types.
declare module '*.s.sol' {
	export const DeployableExampleContract: any
}
