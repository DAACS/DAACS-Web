import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table/cell/classes-status', 'Integration | Component | table/cell/classes status', {
  integration: true
});

test('it renders', function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('tableActions', {
        resendInvite() {}
    });

    this.render(hbs`{{table/cell/classes-status tableActions=tableActions}}`);

    assert.ok(this.$().text().trim(), 'Pending Invite Resend Invite');
});
