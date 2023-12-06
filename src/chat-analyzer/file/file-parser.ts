import { Rule } from '../types/rule';
import { Message } from '../types/message';
import * as fs from 'fs';
import path from 'path';

const CHAT_LINE_SEPARATOR = '|';
const RULE_LINE_SEPARATOR = '|';

export class FileParser {
  private parseChatLine(line: string, fileName: string): Message {
    const lineSegments = line.split(CHAT_LINE_SEPARATOR);

    return {
      sourceUsername: lineSegments[0],
      publicChannelName: lineSegments[1],
      content: lineSegments[2],
      fileName,
    };
  }

  public async parseChatDirectory(chatDirectory: string): Promise<Message[]> {
    const fileNames = await fs.promises.readdir(path.resolve(chatDirectory));

    const filePairs = await Promise.all(
      fileNames.map(
        (fileName) =>
          fs.promises
            .readFile(path.resolve(chatDirectory, fileName), 'utf8')
            .then((fileContent) => [fileName, fileContent]), // return key value pair as filename, fileContent
      ),
    );

    return filePairs.flatMap(([fileName, fileContent]) => {
      const lines = fileContent
        .split(/\r?\n/)
        .filter((line) => line.trim().length > 0); //split by newline and filter empty lines

      return lines.map((line) => this.parseChatLine(line, fileName));
    });
  }

  private parseRuleLine(line: string): Rule {
    const lineSegments = line.split(RULE_LINE_SEPARATOR);

    return {
      sourceUsername: lineSegments[0],
      publicChannelName: lineSegments[1],
      keyword: lineSegments[2],
    };
  }

  public async parseRuleFile(ruleFile: string): Promise<Rule[]> {
    const ruleFileContent = await fs.promises.readFile(
      path.resolve(ruleFile),
      'utf8',
    );
    const lines = ruleFileContent
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0); //split by newline and filter empty lines

    return lines.map((line) => this.parseRuleLine(line));
  }
}
