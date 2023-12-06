import { Message } from '../../types/message';
import { RuleStrategy } from './rule-strategy';
import { shouldMatchAllUsernames } from './strategies.util';

export class StringRuleStrategy implements RuleStrategy {
  constructor(
    readonly sourceUsername: string,
    readonly publicChannelName: string,
    readonly keyword: string,
  ) {}

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

    return message.content.includes(this.keyword);
  }
}
