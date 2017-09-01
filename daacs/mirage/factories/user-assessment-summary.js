import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    assessmentId() { return faker.random.uuid() },
    assessmentLabel: "College Skills",
    assessmentType: "CAT",
    completionDate: "",
    domainScores: [
        {
            domainName: "string",
            score: "LOW"
        }
    ],
    firstName: "Great",
    lastName: "Student",
    overallScore: "",
    progressPercentage: 0.6,
    status: "IN_PROGRESS",
    takenDate: "2016-07-13T16:06:58Z",
    userId: "5776c89a3d06267d707d2aba",
    username: "student123"
});
