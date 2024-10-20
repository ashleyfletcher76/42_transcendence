import { module, test } from 'qunit';
import { setupRenderingTest } from 'myapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | header-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<HeaderMenu />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <HeaderMenu>
        template block text
      </HeaderMenu>
    `);

    assert.dom().hasText('template block text');
  });
});
