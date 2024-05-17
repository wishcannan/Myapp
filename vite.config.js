import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  base: "./Myapp/", //等同于  assetsPublicPath :'./'
  plugins: [vue()],
  server:{
    host:'0.0.0.0',//指定服务器 应该监听哪个 IP 地址
    port: 9527, // 指定开发服务器端口
    strictPort: true, // 若端口已被占用则会直接退出
    open: false, // 启动时自动在浏览器中打开应用程序
    proxy: {
      '/api': {
        target: 'http://122.51.212.246:5000',//要代理的本地api地址
        // target: 'http://127.0.0.1:5002',
        changeOrigin: true,//允许跨域
        // pathRewrite:{"^/api":"/"}//将/api开头替换为/api
        rewrite:(path) => path.replace(/^\/api/, "")
      },
    },
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
