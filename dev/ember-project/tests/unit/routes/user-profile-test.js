import { module, test } from 'qunit';
import { setupTest } from 'myapp/tests/helpers';

module('Unit | Route | user-profile', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:user-profile');
    assert.ok(route);
  });
});
