import path from "path";

export default function yamlLoaderPlugin() {
  return {
    name: "yaml-loader-plugin",
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.ya?ml$/,
              use: [
                {
                  loader: require.resolve("yaml-loader"),
                },
              ],
            },
          ],
        },
      };
    },
  };
}
