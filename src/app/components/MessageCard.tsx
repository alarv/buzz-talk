'use client';

import { Message } from '../../types/message';

interface MessageCardProps {
  message: Message;
}

export default function MessageCard(props: MessageCardProps) {
  return (
    <div className="p-3 w-56 h-56 " style={{ background: '#DDF7FF' }}>
      {props.message && (
        <>
          <p>Channel: {props.message.publicChannelName}</p>
          <p>From: {props.message.sourceUsername}</p>
          <p>Content: {props.message.content}</p>
        </>
      )}
    </div>
  );
}
