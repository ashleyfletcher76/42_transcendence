import { module, test } from 'qunit';
import { setupRenderingTest } from 'myapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tournament-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TournamentList />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <TournamentList>
        template block text
      </TournamentList>
    `);

    assert.dom().hasText('template block text');
  });
});
