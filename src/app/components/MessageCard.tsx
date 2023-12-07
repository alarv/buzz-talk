'use client';

import { Message } from '../../types/message';

interface MessageCardProps {
  message: Message;
}

export default function MessageCard(props: MessageCardProps) {
  return (
    <div className="p-3 w-56 h-56 text-sm" style={{ background: '#DDF7FF' }}>
      {props.message && (
        <>
          <p>Channel: {props.message.publicChannelName}</p>
          <p className="my-2">From: {props.message.sourceUsername}</p>
          <p className="my-2">Content: {props.message.content}</p>
        </>
      )}
    </div>
  );
}
