import { module, test } from 'qunit';
import { setupTest } from 'myapp/tests/helpers';

module('Unit | Service | selected', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:selected');
    assert.ok(service);
  });
});