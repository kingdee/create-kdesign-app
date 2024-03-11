'use strict';

require('colors');
const fs = require('fs');
const child_process = require('child_process');
const ora = require('ora');
const remove = require('remove');
const replace = require('replace-in-file');
const inquirer = require('inquirer');

const {spawn} = child_process;

const spinner = ora('Initializing the KDesign App');

const url = 'git@github.com:kdcloudone/kdesign-pro.git';

const cloneToTempDir = (clonePath, version) => {
  return new Promise((resolve, reject) => {
    let git = null;
    if (version === 'umi4') {
      git = spawn('git', ['clone', '-b', 'feat-4.0.0', '--progress', url, clonePath]);
    } else {
      git = spawn('git', ['clone', '--progress', url, clonePath]);
    }
    spinner.text =`Initializing stage 0% complete`;

    git.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    git.stderr.on('data', chunk => {
      const message = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(chunk.toString('utf8'));
      if (!message) {
        return;
      }

      const {stage, progress} = {
        stage: message[1],
        progress: message[2],
        processed: message[3],
        total: message[4],
      };

      spinner.text =`${stage} stage ${`${progress}%`.cyan} complete`;
    });

    git.on('error', err => {
      console.log('\nclone error: ' + err);
      reject(err);
    });

    git.on('close', () => {
      resolve(clonePath);
    });
  });
};

const editFileAndDelGit =  async (projectName, downloadPath) =>{
  const pwd = process.cwd();
  const fullDownloadPath = pwd + '/' + downloadPath;

  try {
    const options = {
      files: [
        fullDownloadPath + '/**/*',
      ],
      ignore:[
        '*.md'
      ],
      from: /@kdcloudjs\/kdesign-pro|kdesign-pro/g,
      to: projectName,
    };
    await replace(options);
    remove.removeSync(fullDownloadPath + '/.git');
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const clone = (answers)=> {
  console.log(`Initializing the KDesign App`.green);
  const {projectName, version} = answers
  spinner.start();
  spinner.color = 'green';
  cloneToTempDir(projectName, version).then(downloadPath => {
    spinner.text =`Receiving objects stage ${`100%`.green} complete`;
    editFileAndDelGit(projectName, downloadPath).then(() => {
      spinner.succeed();
      console.log(`cd ${projectName} && ${version === 'umi4' ? 'pnpm install': 'npm install'}`.gray);
      console.log('\nInitializing Done'.green);
    })
  });
}

const create = (projectName = '') => {
  if (!['-V', '--version'].includes(projectName)) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Please input the project name：',
          default: projectName,
          validate: function (input) {
            const done = this.async();

            fs.exists(input, (exists) => {
              if (exists) {
                done(`The project already exists, please check the project name.`.red);
              } else {
                done(null, true);
              }
            });
          },
        },
        {
          type: 'list',
          name: 'version',
          message: 'What version do you need?',
          choices: ['umi3', 'umi4'],
          filter(val) {
            return val.toLowerCase();
          },
        },
      ])
      .then((answers) => {
        clone(answers);
      });
  }
}

module.exports = create;
