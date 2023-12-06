import { Message } from '../../types/message';

export interface RuleStrategy {
  sourceUsername: string;
  publicChannelName: string;
  keyword: string | RegExp;

  matches(message: Message): boolean;
}
