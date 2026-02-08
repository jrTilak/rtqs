import fs from "fs";

const cwd = process.cwd();

// read all the plugins from the plugins directory and find all the package.json names as array

const pluginsDir = `${cwd}/plugins`;
const outputFile = `${cwd}/lib/plugin-loader/src/plugins.ts`;

const pluginNames = fs
  .readdirSync(pluginsDir)
  .filter((file) => fs.statSync(`${pluginsDir}/${file}`).isDirectory())
  .map((dir) => {
    const packageJsonPath = `${pluginsDir}/${dir}/package.json`;
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      return packageJson.name;
    }
    return null;
  })
  .filter((name): name is string => name !== null);

const outputContent = `// @ts-nocheck
export const PLUGINS: Record<string, () => Promise<any>> = {
${pluginNames.map((name) => `  "${name}": () => import("${name}"),`).join("\n")}
};
`;

fs.writeFileSync(outputFile, outputContent);
console.log(`Plugins import file generated at ${outputFile}`);
