import { NextRequest } from 'next/server';
import { ChatAnalyzer } from '../../../chat-analyzer';

export async function GET(request: NextRequest) {
  // const queryString = Object.fromEntries(request.nextUrl.searchParams);

  const chatAnalyzer = new ChatAnalyzer('dist/example', 'dist/rules', true);
  const messages = await chatAnalyzer.analyze();

  return Response.json(messages);
}
