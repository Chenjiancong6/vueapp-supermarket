const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("views", resolve("src/views"))
            .set("network", resolve("src/network"))
            .set("common", resolve("src/common"))
            .set('models', resolve('src/models'))
            .set('server', resolve('server'))
    }
};