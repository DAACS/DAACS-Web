import Ember from 'ember';
import FileDownload from 'daacs/mixins/file-download';

const {
    isEmpty,
    isNone,
    computed,
    inject: { service }
} = Ember;

export default Ember.Controller.extend(FileDownload, {
    notify: service(),

    domainColumns: computed(function() {
        return [{
            valuePath: 'label',
            sortable: false,
            cellComponent: 'domain-label-cell'
        }, {
            valuePath: 'id',
            label: this.get('i18n').t("admin.manualGrade.low"),
            cellComponent: 'table-grade-domain-cell',
            cellClassNames: 'cell-radio',
            radioValue: 'LOW',
            radioNamePath: 'id',
            align: 'center',
            width: '20%',
            sortable: false
        }, {
            valuePath: 'id',
            label: this.get('i18n').t("admin.manualGrade.medium"),
            cellComponent: 'table-grade-domain-cell',
            cellClassNames: 'cell-radio',
            radioValue: 'MEDIUM',
            radioNamePath: 'id',
            align: 'center',
            width: '20%',
            sortable: false
        }, {
            valuePath: 'id',
            label: this.get('i18n').t("admin.manualGrade.high"),
            cellComponent: 'table-grade-domain-cell',
            cellClassNames: 'cell-radio',
            radioValue: 'HIGH',
            radioNamePath: 'id',
            align: 'center',
            width: '20%',
            sortable: false
        }]
    }),

    assessmentDomains: computed('assessmentContent.domains', function() {
        const domains = Ember.A();

        this.get('assessmentContent.domains').forEach((domain) => {
            domains.pushObject(domain);

            if(!isEmpty(domain.get('subDomains'))) {
                domains.pushObjects(domain.get('subDomains').map((subDomain) => {
                    subDomain.set('isSubdomain', true);
                    return subDomain;
                }));
            }
        });

        return domains;
    }),

    exportAssessment() {
        return this.downloadFile('download/user-assessments', {
            id: this.get('model.id'),
            userId: this.get('model.userId')
        });
    },

    async submitScores() {
        this.get('model').rollbackAttributes();

        let scores = this.get('assessmentContent.domains').map((domain) => {
            let subDomainScores = null;

            if(!isEmpty(domain.get('subDomains'))) {
                subDomainScores = domain.get('subDomains').map((subDomain) => {
                    return {
                        domainId: subDomain.get('id'),
                        rubricScore: subDomain.get('selectedDomainScore'),
                        isAverage: false
                    };
                });
            }

            return {
                domainId: domain.get('id'),
                rubricScore: domain.get('scoreIsSubDomainAverage') ? null : domain.get('selectedDomainScore'),
                isAverage: domain.get('scoreIsSubDomainAverage'),
                subDomainScores
            };
        });

        let unscoredDomain = scores.find((score) => {
            return isNone(score.rubricScore) && !score.isAverage;
        });

        if(unscoredDomain) {
            this.get('notify').error(this.get('i18n').t('admin.manualGrade.unscoredDomains'));
            return Ember.RSVP.reject();
        }

        this.get('model.domainScores').setObjects(scores);
        this.set('model.status', 'GRADED');

        try {
            let result = await this.get('model').save({adapterOptions: {query: {userId: this.get('model.userId')}}});
            this.get('notify').success(this.get('i18n').t('admin.manualGrade.successMsg'));
            this.transitionToRoute('admin.ungraded-assessments');
            return result;
        } catch(error) {
            return Ember.RSVP.reject(error);
        }
    },

    actions: {
        onSelectScore(score, domain) {
            domain.set('selectedDomainScore', score);
        },

        exportAssessment() {
            return this.exportAssessment();
        },

        submitScores() {
            return this.submitScores();
        }
    }
});
