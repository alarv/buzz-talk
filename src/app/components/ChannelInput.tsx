'use client';

interface ChannelInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ChannelInput(props: ChannelInputProps) {
  return (
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder="Channel input"
      className="w-full h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-5"
    />
  );
}
