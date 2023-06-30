#!/usr/bin/env node

const program = require("commander");
const minimist = require("minimist");
const semver = require("semver");
const figlet = require("figlet");
const requiredVersion = require("../package.json").engines.node;
const { error, warn, clearConsole } = require("../lib/utils/common/index");

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  );
  process.exit(1);
}

program
  .version(require("../package.json").version)
  .name(require("../package.json").name)
  .usage("<command> [options]");

// 创建命令
program
  .command("create")
  .usage("<project-name>")
  .description("create a new project")
  .option(
    "-p, --preset <presetName>",
    "Skip prompts and use saved or remote preset"
  )
  .option("-d, --default", "Skip prompts and use default preset")
  .action(function (options, cmd) {
    // console.log("cmd->", cmd);
    const rawArgv = process.argv.slice(3);
    const args = minimist(rawArgv);
    const projectName = args._[0];
    console.log("args", args);
    console.log("options", options);
    if (args._.length > 1) {
      warn(
        "\n ⚠️ 检测到您输入了多个名称，将以第一个参数为项目名，舍弃后续参数哦"
      );
    }
    require("../lib/create")(projectName, options);
  });

program.addHelpText(
  "afterAll",
  figlet.textSync("hw-cli", {
    // font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  })
);

// 解析命令行参数
program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
