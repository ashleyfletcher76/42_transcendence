import { module, test } from 'qunit';
import { setupTest } from 'myapp/tests/helpers';

module('Unit | Route | tournament', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:tournament');
    assert.ok(route);
  });
});
