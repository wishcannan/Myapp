import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", //等同于  assetsPublicPath :'./'
	resolve: {
    alias: {
    '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [vue()],
  server:{
    host:'0.0.0.0',//指定服务器 应该监听哪个 IP 地址
    port: 9527, // 指定开发服务器端口
    strictPort: true, // 若端口已被占用则会直接退出
    open: false, // 启动时自动在浏览器中打开应用程序
  },
  build:{
    outDir: 'song-web', // 生成输出的根目录。如果该目录存在，则会在生成之前将其删除。 默认文件夹名称为dist
    target: 'es2015',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境去掉控制台 console
        drop_debugger: true, // 生产环境去掉控制台 debugger 默认就是true
        dead_code: true, // 删除无法访问的代码 默认就是true
      }
    },
    // minify: false,
    chunkSizeWarningLimit: 2000, // 调整区块大小警告限制
  }
})
