import EmberObject from '@ember/object';
import AnalyticsMixin from 'mordor/mixins/analytics';
import { module, test } from 'qunit';

module('Unit | Mixin | analytics');

// Replace this with your real tests.
test('it works', function(assert) {
  let AnalyticsObject = EmberObject.extend(AnalyticsMixin);
  let subject = AnalyticsObject.create();
  assert.ok(subject);
});
