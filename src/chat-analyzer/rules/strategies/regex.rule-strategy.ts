import { RuleStrategy } from './rule-strategy';
import { Message } from '../../types/message';
import { shouldMatchAllUsernames } from './strategies.util';

export class RegexRuleStrategy implements RuleStrategy {
  private readonly regex: RegExp;
  constructor(
    readonly sourceUsername: string,
    readonly publicChannelName: string,
    readonly keyword: string,
  ) {
    try {
      this.regex = new RegExp(keyword);
    } catch (e) {
      // an invalid regex was entered like '*'
      this.regex = new RegExp('(?!x)x'); // Regex that matches nothing
    }
  }

  matches(message: Message): boolean {
    if (
      !shouldMatchAllUsernames(message) &&
      message.sourceUsername !== this.sourceUsername
    ) {
      return false;
    }

    if (message.publicChannelName !== this.publicChannelName) {
      return false;
    }

    return this.regex.test(message.content);
  }
}
