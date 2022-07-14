const { exec } = require('child_process')
const ora = require('ora');

function clone(projectName) {
  const url ='git@github.com:kdcloudone/kdesign-pro.git'

  const spinner = ora('Initializing the KDesign App');
  spinner.start();
  spinner.color = 'green';

  exec(`git clone ${url} ${projectName}`, (error) => {
    if(error) {
      console.log(error)
    } else {
      exec(`rm -rf ${projectName}/.git`)
      spinner.succeed('KDesign App is ready！');

      console.log('\n')
      console.log(`cd ${projectName} && npm install`.cyan)
      console.log(`Quick start developing`)
    }
  })
}

module.exports = clone
