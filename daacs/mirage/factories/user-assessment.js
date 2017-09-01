import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    assessmentId() { return faker.random.uuid() },
    assessmentLabel: faker.list.cycle('College Skills', 'Reading', 'Writing', 'Mathematics'),
    assessmentType: faker.list.cycle('CAT', 'READING_PASSAGE', 'WRITTEN', 'MATH'),
    completionDate: null,
    domainScores: [{domainName: "string", "score": "LOW"}],
    firstName: "Great",
    lastName: "Student",
    overallScore: "LOW",
    progressPercentage: 0,
    status: "IN_PROGRESS",
    takenDate() { return new Date().toISOString(); },
    userId: "5776c89a3d06267d707d2aba",
    username: "student123"
});
