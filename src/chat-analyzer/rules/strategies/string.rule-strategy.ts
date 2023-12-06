import { Message } from '../../../types/message';
import { RuleStrategy } from './rule-strategy';
import { RESERVED_ALL_USERNAMES_KEYWORD } from './constants';

export class StringRuleStrategy implements RuleStrategy {
  constructor(
    readonly sourceUsername: string,
    readonly publicChannelName: string,
    readonly keyword: string,
  ) {}

  matches(message: Message): boolean {
    if (
      !this.shouldMatchAllUsernames() &&
      message.sourceUsername !== this.sourceUsername
    ) {
      return false;
    }

    if (message.publicChannelName !== this.publicChannelName) {
      return false;
    }

    return message.content.includes(this.keyword);
  }

  private shouldMatchAllUsernames(): boolean {
    return this.sourceUsername === RESERVED_ALL_USERNAMES_KEYWORD;
  }
}
