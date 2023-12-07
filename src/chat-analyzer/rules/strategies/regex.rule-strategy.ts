import { RuleStrategy } from './rule-strategy';
import { Message } from '../../../types/message';
import { RESERVED_ALL_USERNAMES_KEYWORD } from './constants';

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
      console.error('invalid regex:', keyword);
      // an invalid regex was entered like '*'
      this.regex = new RegExp('(?!x)x'); // Regex that matches nothing
    }
  }

  matches(message: Message): boolean {
    // console.log('1regex', this.regex);
    // console.log('1message', message);

    if (
      !this.shouldMatchAllUsernames() &&
      message.sourceUsername !== this.sourceUsername
    ) {
      return false;
    }

    // console.log('2regex', this.regex);
    // console.log('2message', message);

    if (message.publicChannelName !== this.publicChannelName) {
      return false;
    }

    // console.log('3regex', this.regex);
    // console.log('3message', message);

    return this.regex.test(message.content);
  }

  private shouldMatchAllUsernames(): boolean {
    return this.sourceUsername === RESERVED_ALL_USERNAMES_KEYWORD;
  }
}
