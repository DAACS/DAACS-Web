import Ember from 'ember';
import FileDownload from 'daacs/mixins/file-download';
import Pagination from 'daacs/mixins/controller-pagination';

const {
    get,
    set,
    isBlank,
    computed,
    computed: { alias },
    RSVP: { reject },
    inject: { service }
} = Ember;

export default Ember.Controller.extend(Pagination, FileDownload, {
    ajax: service(),
    notify: service(),
    advisor: service(),

    serverQueryParams: ['classId'],

    classes: [],
    classId: null,
    instructorId: null,
    selectedInstructor: null,
    studentEmailList: [],
    selectedEmails: [],
    isForceAccept: true,
    isAdmin: alias('session.user.isAdmin'),

    columns: computed(function() {
        return [{
            valuePath: 'fullName',
            label: get(this, 'i18n').t('classes.student'),
            width: '200px',
            sortable: false
        }, {
            valuePath: 'assessmentScores',
            label: get(this, 'i18n').t('classes.scores'),
            cellComponent: 'table/cell/student-scores',
            sortable: false
        }, {
            valuePath: 'classInviteAccepted',
            cellComponent: 'table/cell/classes-status',
            label: get(this, 'i18n').t('classes.status'),
            width: '150px',
            sortable: false
        }];
    }),

    async reloadClasses() {
        const results = await this.store.query('class', { instructorId: [this.instructorId] });
        set(this, 'classes', results);
    },

    actions: {
        toggleForceAccept() {
            this.toggleProperty('isForceAccept');
        },

        onInstructorChange(user) {
            let instructorId = user ? get(user, 'id') : null;

            this.setProperties({
                instructorId,
                selectedInstructor: user
            });
            //the change action needs to fire in the next run loop
            //so that the query param can be updated before any transitions are made
            Ember.run.next(this, function() {
                this.reloadClasses();
                set(this, 'classId', null);
            });
        },

        importClasses() {
            const path = 'classes/import-modal';
            return this.send('openModal', path, null, path);
        },

        onRowClick(row) {
            this.get('advisor').set('selectedUser', row.content);
            return this.transitionToRoute('dashboard', {queryParams: {userId: row.content.id}});
        },

        async resendInvite(email) {
            try {
                let request = await get(this, 'ajax').request('class-invite/send', {
                    method: 'POST',
                    data: get(this, 'ajax').stringifyData({
                        classId: this.classId,
                        userEmails: [email],
                        forceAccept: false
                    })
                });

                this.setProperties({
                    submitSuccess: true,
                    submitError: null,
                    studentEmailList: null,
                    selectedEmails: null
                });

                get(this, 'notify').success(get(this, 'i18n').t('classes.sentInvitesSuccess'));
                return request;
            } catch(errors) {
                this.set('submitError', errors);
                get(this, 'notify').error(get(this, 'i18n').t('classes.unableToSendInvite'));
                return reject(errors);
            }
        },

        changeSelectedClass(selectedClass) {
            set(this, 'classId', selectedClass.id);
        },

        downloadResults() {
            const result = this.downloadFile('class-scores/download', {
                classId: get(this, 'classId')
            })
            get(this, 'notify').success(get(this, 'i18n').t('classes.downloadSuccess'));
            return result;
        },

        addStudentEmail(select, e) {
            if (e.keyCode === 13 && select.isOpen && !select.highlighted && !isBlank(select.searchText)) {

                if (!this.selectedEmails.includes(select.searchText)) {
                    this.studentEmailList.pushObject(select.searchText);
                    select.actions.choose(select.searchText);
                }
            }
        },

        async sendInvites() {
            const forceAccept = get(this, 'isAdmin') && get(this, 'isForceAccept');
            try {
                let request = await get(this, 'ajax').request('class-invite/send', {
                    method: 'POST',
                    data: get(this, 'ajax').stringifyData({
                        classId: get(this, 'classId'),
                        userEmails: get(this, 'selectedEmails'),
                        forceAccept
                    })
                });

                this.setProperties({
                    submitSuccess: true,
                    submitError: null,
                    studentEmailList: null,
                    selectedEmails: null
                });

                const successMessage = forceAccept ? 'classes.addedStudentsSuccess' : 'classes.sentInvitesSuccess';
                get(this, 'notify').success(get(this, 'i18n').t(successMessage));
                return request;
            } catch(errors) {
                const failMessage = forceAccept ? 'classes.unableToAddStudents' : 'classes.unableToSendInvite';
                set(this, 'submitError', errors);
                get(this, 'notify').error(get(this, 'i18n').t(failMessage));
                return reject(errors);
            }
        }
    }
});
