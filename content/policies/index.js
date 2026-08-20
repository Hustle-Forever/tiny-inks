import privacy from './privacy';
import terms from './terms';
import shipping from './shipping';
import returns from './returns';
import faq from './faq';

export const POLICIES = { privacy, terms, shipping, returns };
export const POLICY_SLUGS = Object.keys(POLICIES);
export const FAQ = faq;
