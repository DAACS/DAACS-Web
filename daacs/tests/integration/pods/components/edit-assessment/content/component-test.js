import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-assessment/content', 'Integration | Component | edit assessment/content', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-assessment/content}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'Dashboard Tab HTML content displayed in the myDAACS dashboard tab for the currently highlighted assessment. Start Page HTML content displayed in the left-hand column of the \"splash\" screen that is displayed when the student starts a new assessment. Start Page Tips HTML content displayed in the right-hand sidebar column of the \"splash\" screen that is displayed when the student starts a new assessment. Help Menu Text Text that is displayed for the option in the \"Help\" menu that will open the help content dialog. Help Dialog HTML content displayed in the overlay dialog that can be accessed by the student while taking the assessment via the \"Help\" menu.');
});
