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

const url = 'git@gitee.com:kingdee/kdesign-pro.git';
const umi4Branch = 'feat-4.0.0';
const simpleBranch = 'feat-simple';

const cloneToTempDir = (clonePath, template) => {
  return new Promise((resolve, reject) => {
    let git = null;
    if (template === 'umi3') {
      git = spawn('git', ['clone', '--progress', url, clonePath]);
    } else if (template === 'umi4') {
      git = spawn('git', ['clone', '-b', umi4Branch, '--progress', url, clonePath]);
    } else {
      git = spawn('git', ['clone', '-b', simpleBranch, '--progress', url, clonePath]);
    }
    spinner.text = `Initializing stage 0% complete`;

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

      spinner.text = `${stage} stage ${`${progress}%`.cyan} complete`;
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

const editFileAndDelGit = async (projectName, downloadPath, template) => {
  const pwd = process.cwd();
  const fullDownloadPath = pwd + '/' + downloadPath;

  try {
    const options = {
      files: [fullDownloadPath + '/**/*'],
      ignore: template === 'simple' ? [] : [fullDownloadPath + '/README.md'],
      from: /@kdcloudjs\/kdesign-pro|kdesign-pro|KDesign Pro/g,
      to: projectName,
    };
    await replace(options);
    remove.removeSync(fullDownloadPath + '/.git');
    remove.removeSync(fullDownloadPath + '/.github');
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const clone = (answers) => {
  console.log(`Initializing the KDesign App`.green);
  const {projectName, template} = answers;
  const start = Date.now();
  spinner.start();
  spinner.color = 'green';
  cloneToTempDir(projectName, template).then(downloadPath => {
    spinner.text = `Receiving objects stage ${`100%`.green} complete`;
    editFileAndDelGit(projectName, downloadPath, template).then(() => {
      spinner.succeed();
      console.log('');
      console.log(`cd ${projectName} && ${template === 'umi3' ? 'npm install' : 'pnpm install'}`.gray);
      console.log('');
      console.log('Initializing Done in '.green + `${((Date.now() - start) / 1000).toFixed(1)}`.yellow + 's'.green);
    }).catch(() => {
      spinner.error();
    });
  }).catch(() => {
    spinner.error();
  });
};

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
          name: 'template',
          message: 'Which template do you need?',
          choices: [
            {name: 'umi3（使用umi3为基础框架，兼容ie11）', value: 'umi3'},
            {name: 'umi4（使用umi4为基础框架，不兼容ie11）', value: 'umi4'},
            {name: 'simple（使用umi4为基础框架，并简化典型页面及功能）', value: 'simple'},
          ],
          filter(val) {
            return val.toLowerCase();
          },
        },
      ])
      .then((answers) => {
        clone(answers);
      });
  }
};

module.exports = create;
