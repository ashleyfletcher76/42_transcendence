import { module, test } from 'qunit';
import { setupRenderingTest } from 'myapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | paddle', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Paddle />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Paddle>
        template block text
      </Paddle>
    `);

    assert.dom().hasText('template block text');
  });
});
