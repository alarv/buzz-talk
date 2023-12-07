import { ChatAnalyzer } from '../index';
import { MessageFormatter } from '../format/message-formatter';

describe('chat analyzer', () => {
  describe('messages1', () => {
    test('string rule strategy', async () => {
      const chatAnalyzer = new ChatAnalyzer(
        'src/chat-analyzer/__tests__/messages1',
        'src/chat-analyzer/__tests__/rules-string-match',
        false,
      );
      const matchingMessages = await chatAnalyzer.analyze();

      expect(matchingMessages).toHaveLength(2);
    });

    test('regex rule strategy', async () => {
      const chatAnalyzer = new ChatAnalyzer(
        'src/chat-analyzer/__tests__/messages1',
        'src/chat-analyzer/__tests__/rules-regex-match',
        true,
      );
      const matchingMessages = await chatAnalyzer.analyze();

      expect(matchingMessages).toHaveLength(4);
      expect(matchingMessages).toEqual([
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
          content: 'enjoy the scone',
          fileName: 'B.txt',
          publicChannelName: 'coffee_breaks',
          sourceUsername: 'mochajoe@akooda.co',
        },
      ]);
    });

    test('when formatted expected format is used', async () => {
      const chatAnalyzer = new ChatAnalyzer(
        'src/chat-analyzer/__tests__/messages1',
        'src/chat-analyzer/__tests__/rules-regex-match',
        true,
      );
      const matchingMessages = await chatAnalyzer.analyze();

      expect(matchingMessages).toHaveLength(4);

      const messageFormatter = new MessageFormatter();

      expect(
        matchingMessages.map((message) =>
          messageFormatter.formatMessage(message),
        ),
      ).toEqual([
        'A.txt: jake@blues.com; sales|akoooda',
        'A.txt: mochajoe@akooda.co; development|four fried chickens and a coke',
        'A.txt: jeffgreen@akooda.co; product|those pretzels are making me thirsty',
        'B.txt: mochajoe@akooda.co; coffee_breaks|enjoy the scone',
      ]);
    });
  });

  describe('messages2', () => {
    test('rules-part 1', async () => {
      const chatAnalyzer = new ChatAnalyzer(
        'src/chat-analyzer/__tests__/messages2',
        'src/chat-analyzer/__tests__/rules-part 1',
        false,
      );
      const matchingMessages = await chatAnalyzer.analyze();

      expect(matchingMessages).toHaveLength(9);
    });

    test('rules-part 2', async () => {
      const chatAnalyzer = new ChatAnalyzer(
        'src/chat-analyzer/__tests__/messages2',
        'src/chat-analyzer/__tests__/rules-part 2',
        true,
      );
      const matchingMessages = await chatAnalyzer.analyze();

      expect(matchingMessages).toHaveLength(6);
    });
  });
});
