import { FileParser } from './file/file-parser';
import { RuleMatcher } from './rules/rule-matcher';
import { Message } from '../types/message';

export class ChatAnalyzer {
  private readonly fileParser = new FileParser();
  constructor(
    private readonly chatDirectory: string,
    private readonly ruleFile: string,
    private readonly regexEnabled: boolean,
  ) {}

  public async analyze(): Promise<Message[]> {
    const messages = await this.fileParser.parseChatDirectory(
      this.chatDirectory,
    );
    const rules = await this.fileParser.parseRuleFile(this.ruleFile);

    const ruleMatcher = new RuleMatcher(this.regexEnabled);
    const ruleStrategies = rules.map((rule) =>
      ruleMatcher.createRuleStrategyFromRule(rule),
    );

    return messages.filter((message) => {
      for (const ruleStrategy of ruleStrategies) {
        if (ruleStrategy.matches(message)) {
          return true;
        }
      }

      return false;
    });
  }
}
