#!/usr/bin/env node

const { program } = require('commander');
const prompts = require('prompts');
const execa = require('execa');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const path = require('path');
const fs = require('fs-extra');

const templateRepo = 'peterkyle01/rust-on-vercel-template';

// Function to update Rust import statements
function updateRustImports(dir, newProjectName) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      updateRustImports(fullPath, newProjectName);
    } else if (file.name.endsWith('.rs')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/rust_on_vercel_template/g, newProjectName.replace(/-/g, '_'));
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

program
  .name('create-rust-on-vercel')
  .description('A CLI to scaffold Rust projects for Vercel.')
  .argument('[project-name]', 'Name of the new project')
  .action(async (projectName) => {
    let finalProjectName = projectName;

    if (!finalProjectName) {
      const response = await prompts({
        type: 'text',
        name: 'name',
        message: 'What is the name of your project?',
        initial: 'my-rust-app',
      });
      finalProjectName = response.name;
    }

    if (!finalProjectName) {
      console.log(chalk.red('❌ Project name is required.'));
      process.exit(1);
    }

    const projectPath = path.join(process.cwd(), finalProjectName);

    // Check if the directory already exists
    if (fs.existsSync(projectPath)) {
      console.log(chalk.red(`❌ Directory '${finalProjectName}' already exists. Please choose a different name.`));
      process.exit(1);
    }

    const spinner = ora(chalk.cyan(`📥 Creating a new Rust app in ${projectPath}...`)).start();

    try {
      await new Promise((resolve, reject) => {
        download(templateRepo, projectPath, (err) => {
          if (err) {
            reject(new Error(`Failed to download template: ${err.message}`));
          } else {
            resolve();
          }
        });
      });

      spinner.succeed(chalk.green('✅ Template downloaded successfully!'));
      
      // Update package.json and Cargo.toml
      const packageJsonPath = path.join(projectPath, 'package.json');
      const cargoTomlPath = path.join(projectPath, 'Cargo.toml');

      console.log(chalk.blue('\n📝 Updating project configuration...'));
      
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = fs.readJsonSync(packageJsonPath);
        packageJson.name = finalProjectName;
        fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
      }

      if (fs.existsSync(cargoTomlPath)) {
        let cargoToml = fs.readFileSync(cargoTomlPath, 'utf8');
        cargoToml = cargoToml.replace(/name = ".*"/, `name = "${finalProjectName}"`);
        fs.writeFileSync(cargoTomlPath, cargoToml, 'utf8');
      }

      // Update Rust import statements
      const apiDir = path.join(projectPath, 'api');
      const libDir = path.join(projectPath, 'lib', 'rust');
      
      if (fs.existsSync(apiDir)) {
        updateRustImports(apiDir, finalProjectName);
      }
      if (fs.existsSync(libDir)) {
        updateRustImports(libDir, finalProjectName);
      }

      console.log(chalk.green('✅ Project configuration updated!'));

      // Create .npmrc to suppress warnings
      const npmrcPath = path.join(projectPath, '.npmrc');
      fs.writeFileSync(npmrcPath, 'audit=false\nfund=false\nloglevel=silent\n', 'utf8');

      console.log(chalk.yellow('\n📦 Installing Node.js dependencies...'));
      const npmSpinner = ora(chalk.cyan('Running npm install...')).start();

      try {
        await execa('npm', ['install', '--silent', '--no-audit', '--no-fund'], { cwd: projectPath });
        npmSpinner.succeed(chalk.green('✅ Node.js dependencies installed!'));
      } catch (error) {
        npmSpinner.fail(chalk.red('❌ Failed to install Node.js dependencies'));
        throw error;
      }

      console.log(chalk.yellow('\n🦀 Building Rust project...'));
      const cargoSpinner = ora(chalk.cyan('Running cargo build...')).start();

      try {
        await execa('cargo', ['build'], { cwd: projectPath });
        cargoSpinner.succeed(chalk.green('✅ Rust project built successfully!'));
      } catch (error) {
        cargoSpinner.fail(chalk.red('❌ Rust build failed'));
        console.log(chalk.yellow('\n⚠️  Don\'t worry! You can fix the build errors later.'));
        console.log(chalk.gray('   The project has been created and you can run `cargo build` manually.'));
      }

      console.log(chalk.green.bold('\n🎉 Your Rust-on-Vercel app is ready!'));
      console.log(chalk.blue('\n📂 Next steps:'));
      console.log(`   ${chalk.cyan(`cd ${finalProjectName}`)}`);
      console.log(`   ${chalk.cyan('vercel dev')}`);
      console.log(chalk.magenta('\n🚀 Happy coding!'));

    } catch (error) {
      spinner.fail(chalk.red(`❌ Failed to create project: ${error.message}`));
      fs.removeSync(projectPath); // Clean up on failure
      process.exit(1);
    }
  });

program.parse(process.argv);