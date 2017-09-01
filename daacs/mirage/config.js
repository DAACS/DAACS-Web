/* eslint no-console: 0 */
import Config from 'daacs/config/environment';

export default function() {

    // These comments are here to help you get started. Feel free to delete them.

    /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
    */

    // make this `http://localhost:8080`, for example, if your API is on a different server
    this.urlPrefix = Config.RESTAPI;

    // make this `api`, for example, if your API is namespaced
    //this.namespace = '';

    // delay for each request, automatically set to 0 during testing
    // this.timing = 400;
    let server = this;
    this.pretender.passthroughRequest = function(verb, path, request) {
        if(server.shouldLog()) {
          console.log(`Passthrough request: ${verb.toUpperCase()} ${request.url}`);
        }

        if(request.requestHeaders['content-type']) {
            request.requestHeaders['Content-Type'] = request.requestHeaders['content-type'];
            delete request.requestHeaders['content-type'];
        }
    }

    /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
    */

    // Comment out route handlers once the server is ready to handle the endpoint
    // this will allow requests for that route to passthrough mirage and make a real network request

    // this.post('/oauth/token', (schema) => {
    //     return schema.oauthTokens.first();
    // });

    // this.get('/users/me', (schema) => {
    //     return schema.users.first();
    // });

    // this.get('/assessment-summaries', (schema) => {
    //     return schema.assessmentSummaries.all();
    // });

    // this.get('/user-assessment-summaries', (schema) => {
    //     return schema.userAssessmentSummaries.all();
    // });

    // this.post('/user-assessments', (schema, request) => {
    //     let params = JSON.parse(request.requestBody);
    //     params.data.takenDate = new Date().toISOString();
    //     return schema.userAssessments.create(params.data);
    // });

    // let questionGroupIds = {};
    // this.get('/user-assessment-question-groups', (schema, request) => {
    //     //just return a collection with a single question group, with each successive call returning the next one
    //     //to more closely mimic what the server will be returning for query params of assessmentId={id}&limit=1
    //     if(!questionGroupIds[request.queryParams.assessmentId]) {
    //         questionGroupIds[request.queryParams.assessmentId] = 0;
    //     }
    //
    //     return schema.userAssessmentQuestionGroups.where({id: ++questionGroupIds[request.queryParams.assessmentId]});
    // });

    // this.put('/user-assessment-question-groups/:id', (schema, request) => {
    //     //don't actually update anything, so that we can reuse the model for additional requests
    //     return schema.userAssessmentQuestionGroups.find(request.params.id).update({});
    // });

    // this.get('/user-assessment-writing-samples', (schema, request) => {
    //     let collection = schema.userAssessmentWritingSamples.all();
    //
    //     collection.models.forEach((model) => {
    //         model.assessmentId = request.queryParams.assessmentId;
    //     });
    //
    //     return collection;
    // });

    // this.get('/users', (schema) => {
    //     return schema.users.all();
    // });

    // this.passthrough('/users/me');
    // this.get('/users/:id', (schema) => {
    //     return schema.users.first();
    // });

    // this.get('/assessment-contents/:id', (schema, request) => {
    //     return schema.assessmentContents.where({assessmentId: request.params.id}).models[0];
    // });

    //all other AJAX requests not matched by the route handlers defined above
    //will pass through as real network requests to the live API
    this.passthrough();
}
