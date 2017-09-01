import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    assessmentId() { return faker.random.uuid() },
    assessmentCategory: faker.list.cycle('COLLEGE_SKILLS', 'READING', 'WRITING', 'MATHEMATICS'),
    assessmentType: faker.list.cycle('CAT', 'READING_PASSAGE', 'WRITTEN', 'MATH'),
    label: faker.list.cycle('College Skills', 'Reading', 'Writing', 'Mathematics'),
    enabled: true,
    userHasTakenAssessment: true,
    userPassesPrerequisites: true,
    content() {
        return `
            <h3>${faker.lorem.words()}</h3>
            <img
                src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg"
                class="pull-right"
                style="padding:20px 0 20px 20px; max-width:400px;">
            <p>This is additional info about the ${this.label} assessment.</p>
            <p>${faker.lorem.paragraph(12)}</p>
            <h3>${faker.lorem.words()}</h3>
            <p>${faker.lorem.paragraph(15)}</p>`;
    },
    userAssessmentSummary: faker.list.cycle(
        {
            id: faker.random.uuid(),
            userId: "5776c89a3d06267d707d2aba",
            assessmentId() { return this.assessmentId; },
            assessmentType() { return this.assessmentType; },
            completionDate: null,
            takenDate: "2016-07-06T12:43:00.384Z",
            status: "IN_PROGRESS",
            progressPercentage: 0.4,
            domainScores: [],
            overallScore: null
        }, {
            id: faker.random.uuid(),
            userId: "5776c89a3d06267d707d2aba",
            assessmentId() { return this.assessmentId; },
            assessmentType() { return this.assessmentType; },
            completionDate: "2016-07-06T12:43:00.384Z",
            takenDate: "2016-07-06T12:43:00.384Z",
            status: "GRADED",
            progressPercentage: 1.0,
            domainScores: [
                {domainName: "string", score: "LOW"}
            ],
            overallScore: "MEDIUM"
        }, null, null),
    prerequisites: faker.list.cycle([
        {
            prereqType: "ASSESSMENT",
            reason: "You must complete the writing assessment first!",
            assessmentType: "WRITING",
            completionStatus: "COMPLETED"
        }
    ], null, null, null)
});
