'use client';

import ChannelInput from './ChannelInput';
import MessageList from './MessageList';
import { useState } from 'react';

export default function Dashboard() {
  const [channelFilter, setChannelFilter] = useState('');

  return (
    <>
      <header className="grid grid-cols-6 grid-rows-2 py-4 pl-2 gap-4 sm:pl-0">
        <div className="col-span-3">
          <div className="row-span-1">
            <h1 className="text-3xl font-semibold col-span-3 py-3">
              The Fetcher
            </h1>
          </div>
          <div className="row-span-1">
            <p>Fetches, parses, and filters out messages</p>
          </div>
        </div>

        <div className="col-span-2">
          <ChannelInput value={channelFilter} onChange={setChannelFilter} />
        </div>
        <div className="col-span-1">
          <p>Please fill in the channel you want to see the messages from</p>
        </div>
      </header>

      <div>
        <MessageList channelFilter={channelFilter} />
      </div>
    </>
  );
}
