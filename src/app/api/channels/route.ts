import { NextRequest } from 'next/server';
import { RuleMatcher } from '../../../chat-analyzer/rules/rule-matcher';
import { Rule } from '../../../types/rule';

const messages = [
  {
    content: 'akoooda',
    fileName: 'A.txt',
    publicChannelName: 'sales',
    sourceUsername: 'jake@blues.com',
  },
  {
    content: 'four fried chickens and a coke',
    fileName: 'A.txt',
    publicChannelName: 'development',
    sourceUsername: 'mochajoe@akooda.co',
  },
  {
    content: 'those pretzels are making me thirsty',
    fileName: 'A.txt',
    publicChannelName: 'product',
    sourceUsername: 'jeffgreen@akooda.co',
  },
  {
    content: 'four fried chickens and a coke',
    fileName: 'B.txt',
    publicChannelName: 'competition',
    sourceUsername: 'bob@einstein.com',
  },
  {
    content: 'enjoy the scone',
    fileName: 'B.txt',
    publicChannelName: 'coffee_breaks',
    sourceUsername: 'mochajoe@akooda.co',
  },
  {
    content: 'hi larry',
    fileName: 'B.txt',
    publicChannelName: 'coffee_breaks',
    sourceUsername: 'mochajoe@akooda.co',
  },
];

function generateChannelStartsWithRegex(channelFilter: string) {
  return `^${channelFilter}`;
}

export async function GET(request: NextRequest) {
  if (!request.nextUrl.searchParams.has('channelFilter')) {
    return Response.json(messages);
  }

  const rules: Rule[] = [
    {
      sourceUsername: 'all',
      publicChannelName: generateChannelStartsWithRegex(
        request.nextUrl.searchParams.get('channelFilter')!,
      ),
      keyword: '.*',
    },
  ];

  const regexMatchEnabled = true;
  const ruleMatcher = new RuleMatcher(regexMatchEnabled);
  const ruleStrategies = rules.map((rule) =>
    ruleMatcher.createRuleStrategyFromRule(rule),
  );

  const matchingMessages = messages.filter((message) => {
    for (const ruleStrategy of ruleStrategies) {
      if (ruleStrategy.matches(message)) {
        return true;
      }
    }

    return false;
  });

  return Response.json(matchingMessages);
}
