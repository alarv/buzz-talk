import { Message } from '../../types/message';

const RESERVED_KEYWORD_ALL = 'all';

export function shouldMatchAllUsernames(message: Message) {
  return message.sourceUsername === RESERVED_KEYWORD_ALL;
}
