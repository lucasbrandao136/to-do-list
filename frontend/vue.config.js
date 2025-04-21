const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/backend': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/backend/, ''),
      },
    },
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        poll: 1000,
      },
    },
  },
  transpileDependencies: true,
});
// This configuration file is used to set up the Vue.js development server.
// It includes settings for the development server, such as file watching and proxying API requests.
// The `devServer` property configures the development server.
// The `watchFiles` property specifies which files to watch for changes.
// The `poll` option sets the polling interval for file changes.
// The `proxy` property sets up a proxy for API requests.
// The `target` option specifies the backend server URL.
// The `changeOrigin` option allows cross-origin requests.  