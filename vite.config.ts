import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "unplugin-dts"

export default defineConfig({
  plugins: [react(), dts({ bundleTypes: true })],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
    emptyOutDir: true,
  },
})
