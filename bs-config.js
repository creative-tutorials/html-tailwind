module.exports = {
  proxy: "http://localhost:5300", // Your server's address
  files: ["src/**/*.html", "src/**/*.css"], // Files to watch
  port: 4000, // Port for Browser-Sync
  reloadDelay: 500, // Delay to ensure the server restarts before reloading
  open: false, // Prevents Browser-Sync from opening a new tab on start
};
