import { Message } from '../../types/message';

export class MessageFormatter {
  public formatMessage(message: Message): string {
    // <File name>: <source_username>; <public_channel_name>|<message>
    return `${message.fileName}: ${message.sourceUsername}; ${message.publicChannelName}|${message.content}`;
  }
}
