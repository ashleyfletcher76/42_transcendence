import { module, test } from 'qunit';
import { setupTest } from 'myapp/tests/helpers';

module('Unit | Service | user-tracker', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:user-tracker');
    assert.ok(service);
  });
});
