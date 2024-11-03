import { module, test } from 'qunit';
import { setupRenderingTest } from 'myapp/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | profile-other', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ProfileOther />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <ProfileOther>
        template block text
      </ProfileOther>
    `);

    assert.dom().hasText('template block text');
  });
});
