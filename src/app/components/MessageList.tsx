'use client';

import MessageCard from './MessageCard';
import { Message } from '../../types/message';
import { useEffect, useState } from 'react';

async function getChannels(channelFilter: string | undefined) {
  let queryString = '';
  if (channelFilter) {
    queryString = new URLSearchParams({ channelFilter }).toString();
  }

  try {
    const response = await fetch(`/api/channels?${queryString}`, {
      cache: 'no-cache',
    });

    return await response.json();
  } catch (err) {
    console.error('channels could not be retrieved', err);
    return [];
  }
}

interface MessageListProps {
  channelFilter: string;
}

export default function MessageList(props: MessageListProps) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getChannels(props.channelFilter).then((messages) => setMessages(messages));
  }, [props.channelFilter]);

  return (
    <div className="message-list">
      <div>{props.channelFilter}</div>
      {messages.map((message: Message, index: number) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
}
