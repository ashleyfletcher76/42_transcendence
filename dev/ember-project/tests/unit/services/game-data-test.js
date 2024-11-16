import { module, test } from 'qunit';
import { setupTest } from 'myapp/tests/helpers';

module('Unit | Service | game-data', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:game-data');
    assert.ok(service);
  });
});
