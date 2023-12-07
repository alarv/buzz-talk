import { RuleStrategy } from './rule-strategy';
import { Message } from '../../../types/message';
import { RESERVED_ALL_USERNAMES_KEYWORD } from './constants';

export class RegexRuleStrategy implements RuleStrategy {
  private readonly channelRegex: RegExp;
  private readonly keywordRegex: RegExp;
  constructor(
    readonly sourceUsername: string,
    readonly publicChannelName: string,
    readonly keyword: string,
  ) {
    try {
      this.channelRegex = new RegExp(publicChannelName);
      this.keywordRegex = new RegExp(keyword);
    } catch (e) {
      console.error(
        `invalid regex. keyword: ${keyword}, publicChannelName: ${publicChannelName}`,
      );
      // an invalid regex was entered like '*'

      const nonMatchingRegex = new RegExp('(?!x)x'); // Regex that matches nothing
      this.keywordRegex = nonMatchingRegex;
      this.channelRegex = nonMatchingRegex;
    }
  }

  matches(message: Message): boolean {
    if (
      !this.shouldMatchAllUsernames() &&
      message.sourceUsername !== this.sourceUsername
    ) {
      return false;
    }

    if (
      message.publicChannelName !== this.publicChannelName &&
      !this.channelRegex.test(message.publicChannelName)
    ) {
      return false;
    }

    return this.keywordRegex.test(message.content);
  }

  private shouldMatchAllUsernames(): boolean {
    return this.sourceUsername === RESERVED_ALL_USERNAMES_KEYWORD;
  }
}
