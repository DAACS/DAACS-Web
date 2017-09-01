import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    userId() { return faker.random.uuid() },
    username() { return faker.internet.email(); },
    firstName() { return faker.name.firstName(); },
    lastName() { return faker.name.lastName(); },
    authorities: [{"authority": "ROLE_STUDENT"}],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    enabled: true,
    attributes: null
});
