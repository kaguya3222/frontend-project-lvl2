#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstFilePath, secondFilePath) => {
    console.log(genDiff(firstFilePath, secondFilePath));
  });

program.parse();
