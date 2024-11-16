import { module, test } from 'qunit';
import { setupRenderingTest } from 'myapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | pong-game', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<PongGame />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <PongGame>
        template block text
      </PongGame>
    `);

    assert.dom().hasText('template block text');
  });
});
