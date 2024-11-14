import { module, test } from 'qunit';
import { setupRenderingTest } from 'myapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | title-animation', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TitleAnimation />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <TitleAnimation>
        template block text
      </TitleAnimation>
    `);

    assert.dom().hasText('template block text');
  });
});
