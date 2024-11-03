import { module, test } from 'qunit';
import { setupRenderingTest } from 'myapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | scoreboard', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Scoreboard />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Scoreboard>
        template block text
      </Scoreboard>
    `);

    assert.dom().hasText('template block text');
  });
});
