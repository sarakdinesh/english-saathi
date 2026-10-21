const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
// Use Metro's file watcher so previewing does not depend on a system Watchman service.
config.resolver.useWatchman = false;
module.exports = config;
