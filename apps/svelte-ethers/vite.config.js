import { sveltekit } from '@sveltejs/kit/vite'
import { vitePluginTevm } from '@tevm/vite-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	build: {
		target: 'esnext',
	},
	plugins: [sveltekit(), vitePluginTevm({})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
