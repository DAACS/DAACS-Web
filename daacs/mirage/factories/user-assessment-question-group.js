import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    items: [
        {
            id: "1",
            question: faker.list.cycle(
                "This is the multiple choice question text.",
                "This is another multiple choice question for you to answer.",
                "This is yet another multiple choice question to complete.",
                "This is the last multiple choice question to figure out."
            ),
            //itemAnswer: null,
            itemAnswers: [
                {
                    content: "This is the first choice.",
                    id: "1",
                    score: 0
                }, {
                    content: "This is the second choice.",
                    id: "2",
                    score: 0
                }, {
                    content: "This is the third choice.",
                    id: "3",
                    score: 0
                }, {
                    content: "This is the fourth choice.",
                    id: "4",
                    score: 0
                }
            ],
            itemContent: {
                id: "1",
                content: "string",
                itemContentType: "WORD"
            }
        }
    ]
});
