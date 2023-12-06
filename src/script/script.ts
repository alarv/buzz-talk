#!/usr/bin/env node

import { program } from 'commander';
import { ChatAnalyzer } from '../chat-analyzer';

program
  .name('buzz-talk')
  .description(
    'A streamlined tool for parsing and analyzing chat logs, enabling users to quickly extract and filter informative messages from public channels based on custom rules and preference',
  )
  .version('0.1.0')
  .requiredOption(
    '-d, --directory <directory>',
    'The directory of the chat log files',
  )
  .requiredOption(
    '-r, --rules <rules>',
    'A path to a configuration (rules) file that describes the messages pattern to track',
  )
  .option('--regex');

program.parse();

const options = program.opts();
const { directory, rules } = options;

(async () => {
  const chatAnalyzer = new ChatAnalyzer(directory, rules, options.regex);
  const matchingMessages = await chatAnalyzer.analyze();

  matchingMessages.forEach((message) => console.log(message));
})();
