const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
    },
    {
        type: "input",
        name: "bio",
        message: "Please give a description of your project.",
    },
    {
        type: "input",
        name: "install",
        message: "How can someone run your project?",
    },
    {
        type: "input",
        name: "usage",
        message: "How can it be used?",
    },
     {
        type: "input",
        name: "license",
        message: "What licensing was used?",
    },
    {
        type: "input",
        name: "contribute",
        message: "Are there any contributors?",
    }, 
    {
        type: "input",
        name: "gitname",
        message: "Please enter your GitHub username.",
    },
    {
        type: "input",
        name: "repo",
        message: "Please enter the name of your repo",
    },
    {
        type: "input",
        name: "tests",
        message: "Is there a how to for testing?",
    },
    {
        type: "input",
        name: "questions",
        message: "Please feel free to contact me.",
    },
  ]) 
};

function generateReadme(answers) {
  return `# ${answers.title}
  ![GitHub](https://img.shields.io/github/license/${answers.gitname}/${answers.repo}?color=39%2C%20255%2C%200%20&style=for-the-badge)
  ## Description
  ${answers.bio}
  <hr>
  ## Table of Contents 
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributions](#contributions)
  * [Testing](#testing)
  * [Questions](#questions)
  <hr>
  ## Installation
  ${answers.install}
  ## Usage
  ${answers.usage}
  ## License
  Created under the ${answers.license} license. See LICENSE.txt for more information.
  ## Contributions
  ${answers.contribute}
  ## Testing
  ${answers.tests}
  ## Questions
  If you have any questions, please feel free to reach out. <br>  
  `
  }

  promptUser().then(function(answers){
    const readme=generateReadme(answers);
    
    return writeFileAsync("README.md", readme);
}).then(function(){
    console.log("Successfully created README");
}).catch(function(err){
    console.log(err);
});