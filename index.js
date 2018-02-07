const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const workingDirectory = process.cwd();
const templatePath = path.resolve(__dirname, 'template');

const createProject = (projectName) => {
    fs.copySync(`${templatePath}`, `${workingDirectory}/${projectName}`);
}

inquirer.prompt([
    {
        type: 'input',
        default: 'my-project',
        name: 'projectName',
        message: 'What would you like to call your project?'
    }
]).then(answers => {
    const { projectName } = answers;
    const exists = fs.existsSync(`${workingDirectory}/${projectName}`);

    // If path exists, ask user if they wish to overwrite the contents
    // of the folder
    if (exists) {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                default: false,
                message: 'Directory exists, are you sure you want to overwrite its contents?'
            }
        ]).then(answers => {
            if (answers.overwrite) {
                createProject(projectName);
            } else {
                process.exit();
            }
        });
    } else {
        createProject(projectName);
    }
});