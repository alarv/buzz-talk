import { RuleStrategy } from './strategies/rule-strategy';
import { Rule } from '../types/rule';
import { StringRuleStrategy } from './strategies/string.rule-strategy';
import { RegexRuleStrategy } from './strategies/regex.rule-strategy';

export class RuleMatcher {
  constructor(private readonly regexMatchEnabled: boolean) {}

  public createRuleStrategyFromRule(rule: Rule): RuleStrategy {
    if (this.regexMatchEnabled) {
      return new RegexRuleStrategy(
        rule.sourceUsername,
        rule.publicChannelName,
        rule.keyword,
      );
    } else {
      return new StringRuleStrategy(
        rule.sourceUsername,
        rule.publicChannelName,
        rule.keyword,
      );
    }
  }
}
