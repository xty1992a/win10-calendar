const { src, root } = require("./utils");

module.exports = (config) => {
  config.resolve.extensions.add("ts").add("tsx");
  config.resolve.alias
    .set("@", root("src"))
    .set("api", root("src/api"))
    .set("assets", root("src/assets"))
    .set("components", root("src/components"))
    .set("utils", src("utils"));
};
