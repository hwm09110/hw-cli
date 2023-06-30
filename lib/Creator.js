class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName;
    this.dir = targetDir;
  }

  create(cliOptions = {}, preset = null) {
    console.log("cliOptions", cliOptions);
    console.log("preset", preset);
  }
}

module.exports = Creator;
