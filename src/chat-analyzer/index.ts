import { FileParser } from './file/file-parser';
import { RuleMatcher } from './rules/rule-matcher';
import { Message } from './types/message';

export class ChatAnalyzer {
  private readonly fileParser = new FileParser();
  constructor(
    private readonly chatDirectory: string,
    private readonly ruleFile: string,
    private readonly regexEnabled: boolean,
  ) {}

  public async analyze(): Promise<string[]> {
    const messages = await this.fileParser.parseChatDirectory(
      this.chatDirectory,
    );
    const ruleMatcher = new RuleMatcher(this.regexEnabled);

    const rules = await this.fileParser.parseRuleFile(this.ruleFile);

    const ruleStrategies = rules.map((rule) =>
      ruleMatcher.createRuleStrategyFromRule(rule),
    );

    const matchingMessages = messages.filter((message) => {
      for (const ruleStrategy of ruleStrategies) {
        if (ruleStrategy.matches(message)) {
          return true;
        }
      }

      return false;
    });

    return matchingMessages.map((message) => this.formatMessage(message));
  }

  private formatMessage(message: Message): string {
    // <File name>: <source_username>; <public_channel_name>|<message>
    return `${message.fileName}: ${message.sourceUsername}; ${message.publicChannelName}|${message.content}`;
  }
}