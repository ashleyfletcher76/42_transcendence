import { module, test } from 'qunit';
import { setupRenderingTest } from 'myapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tournament', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Tournament />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Tournament>
        template block text
      </Tournament>
    `);

    assert.dom().hasText('template block text');
  });
});
