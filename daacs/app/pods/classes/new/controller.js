import Ember from "ember";
import EmberValidations from "ember-validations";

const {
    get,
    set,
    computed,
    inject: { service },
    computed: { notEmpty },
    RSVP: { reject },
} = Ember;

export default Ember.Controller.extend(EmberValidations, {
    notify: service(),
    submitValidationFailed: false,

    validations: {
        "model.name": { presence: true },
        "model.assessmentIds": { presence: true },
    },

    noName: notEmpty("errors.model.name"),
    noAssessments: notEmpty("errors.model.assessmentIds"),

    selectedAssessments: computed(
        "assessments.@each.id",
        "model.assessmentIds.[]",
        function () {
            const assessments = get(this, "assessments").toArray();
            return get(this, "model.assessmentIds").map((id) =>
                assessments.findBy("id", id)
            );
        }
    ),

    async save() {
        try {
            const model = get(this, "model");
            await model.save();
            set(this, "submitValidationFailed", false);
            get(this, "notify").success(
                get(this, "i18n").t("classes.createClass.submitSuccess")
            );
            return this.transitionToRoute("classes");
        } catch (error) {
            set(this, "submitValidationFailed", true);
            get(this, "notify").error(
                get(this, "i18n").t("classes.createClass.submitError")
            );
            return reject(error);
        }
    },

    updateAssessmentIds(assessments) {
        const assessmentIds = assessments ? assessments.mapBy("id") : [];
        set(this, "model.assessmentIds", assessmentIds);
    },

    actions: {
        save() {
            return this.save();
        },
        updateAssessmentIds(assessments) {
            return this.updateAssessmentIds(assessments);
        },
    },
});
