import { vitePluginTevm } from '@tevm/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vitePluginWasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		global: 'globalThis',
	},
	build: {
		target: 'esnext',
		rollupOptions: {
			external: ['@safe-globalThis/safe-apps-provider', '@safe-globalThis/safe-apps-sdk'],
		},
	},
	plugins: [
		nodePolyfills({
			globals: {
				process: true,
				Buffer: true,
				global: true,
			},
		}),
		react(),
		vitePluginTevm({}) as any,
		vitePluginWasm(),
	],
})
