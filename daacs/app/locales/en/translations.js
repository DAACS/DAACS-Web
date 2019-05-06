export default {
  // "some.translation.key": "Text for some.translation.key",
  //
  // "a": {
  //   "nested": {
  //     "key": "Text for a.nested.key"
  //   }
  // },
  //
  // "key.with.interpolation": "Text with {{anInterpolation}}"
    brand: {
        name: "DAACS",
        copyright: "© 2016. All rights reserved."
    },
    login: {
        label: "Sign in",
        email: "Email Address",
        password: "Password",
        authFailed: "Authentication failed, please try again.",
        samlAuthFailed: "Sorry, your authentication request has failed.",
        forgotPassword: "Forgot your password?"
    },
    logout: {
        label: "Log out"
    },
    password: {
        label: "Password",
        confirm: "Confirm Password",
        reset: "Reset",
        resetHeading: "Reset your password",
        instructions: "We'll email you instructions on how to reset your password.",
        email: "Email Address",
        send: "Send",
        backToLogin: "Back to login",
        sendSuccess: "Thanks! An email has been sent to you with instructions to reset your password.",
        resetSuccess: "Your password has been reset. Please login."
    },
    createAccount: {
        label: "Create Account",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        password: "Password",
        passwordConfirm: "Confirm Password",
        role: "Role",
        selectRole: "Select a role",
        student: "Student",
        advisor: "Advisor",
        success: "Account created successfully. Please log in."
    },
    userConsent: {
        label: "Data Usage Consent",
        consent: "I CONSENT",
        consentDescription: "I agree to provide feedback on DAACS to external evaluators and understand my responses will remain confidential, reported only in aggregate.",
        dontConsent: "I DO NOT CONSENT",
        dontConsentDescription: "Please do not ask me follow-up questions about DAACS."
    },
    errors: {
        inclusion: " is not included in the list",
        exclusion: " is reserved",
        invalid: " is invalid",
        confirmation: " doesn't match {{attribute}}",
        accepted: " must be accepted",
        empty: " can't be empty",
        blank: " can't be blank",
        present: " must be blank",
        tooLong: " is too long (maximum is {{count}} characters)",
        tooShort: " is too short (minimum is {{count}} characters)",
        wrongLength: " is the wrong length (should be {{count}} characters)",
        notANumber: " is not a number",
        notAnInteger: " must be an integer",
        greaterThan: " must be greater than {{count}}",
        greaterThanOrEqualTo: " must be greater than or equal to {{count}}",
        equalTo: " must be equal to {{count}}",
        lessThan: " must be less than {{count}}",
        lessThanOrEqualTo: " must be less than or equal to {{count}}",
        otherThan: " must be other than {{count}}",
        odd:  " must be odd",
        even: " must be even",
        validJson: " must be a valid JSON document"
    },
    alert: {
        close: "Close"
    },
    dialog: {
        close: "Close",
        cancel: "Cancel",
        ok: "OK",
        done: "Done",
        next: "Next",
        back: "Back",
        finish: "Finish"
    },
    fourOhFour: {
        pageNotFound: "404 Page not found",
        message: "Sorry, the page you're looking for could not be found."
    },
    fourOhThree: {
        forbidden: "403 Forbidden",
        message: "Sorry, but you do not have the proper credentials to view this page."
    },
    routeError: {
        title: "System Error",
        message: "Sorry, an error occurred while attempting to load this page."
    },
    admin: {
        label: "Admin",
        ungradedAssessments: "Ungraded Assessments",
        allAssessments: "All Assessments",
        manageAssessmentsDescription: "Listed below are all assessments, both active and inactive. Use the filter menu to only show assessments of a particular category, or use the list on the left to access the active assessments.",
        ungradedAssessmentsDescription: "Listed below are all ungraded assessments. From this list, you may retry grading (for assessments with automatic scoring enabled), or view the assessment to grade manually.",
        activeAssessments: "Active Assessments",
        manageAssessments: "Manage Assessments",
        completionDate: "Completion Date",
        student: "Student",
        assessment: "Assessment",
        noAssessmentsFound: "No assessments found",
        noActiveAssessmentsFound: "No active assessments found",
        view: "View",
        details: "Details",
        export: "Export",
        exportAll: "Export All",
        exportAllManualGrade: "Exports all ungraded assessments that are manually graded.",
        retryGrading: "Retry Grading",
        gradingFailed: "Automatic grading of the assessment failed.",
        gradingQueued: "The request to grade the assessment has been queued. Please refresh this list in a few minutes to check its status.",
        gradingFailedUnexpected: "An unexpected error occurred while attempting to grade the assessment.",
        grading: "Grading...",
        graded: "Graded",
        reload: "Reload",
        createdOn: "Created on {{date}}",
        createdDate: "Created Date",
        assessmentLabel: "Label",
        results: "Results",
        status: "Status",
        active: "Active",
        inactive: "Inactive",
        activate: "Activate",
        deactivate: "Deactivate",
        activated: "The assessment has been activated",
        deactivated: "The assessment has been deactivated",
        activateError: "Unable to update the assessment. Please correct any errors and try again.",
        numUngraded: {
            one: "1 ungraded",
            other: "{{count}} ungraded"
        },
        numCompletions: {
            one: "1 completion",
            other: "{{count}} completions"
        },
        categories: {
            label: "Assessment Categories",
            all: "Show all assessments",
            filterBy: "Filter by category",
            mathematics: "Mathematics",
            reading: "Reading",
            srl: "Self-Regulated Learning",
            writing: "Writing"
        },
        scoring: {
            method: "Scoring Method",
            anyMethod: "Any scoring method",
            filterBy: "Filter by scoring method",
            manual: "Manual",
            manualScoring: "Manual Scoring",
            automatic: "Automatic",
            automaticScoring: "Automatic Scoring",
            methodUpdated: "The scoring method has been updated",
            methodUpdateError: "An error occurred while attempting to update the scoring method"
        },
        manualGrade: {
            assessment: "Grade Assessment",
            back: "Back to list",
            domainScores: "Domain Scores",
            submit: "Submit",
            selectPlaceholder: "Select a score",
            low: "Low",
            medium: "Medium",
            high: "High",
            successMsg: "The assessment has been graded successfully",
            unscoredDomains: "Please select a score for all domains to continue"
        },
        assessmentDetails: {
            label: "Assessment Details",
            configuration: "Grading Configuration",
            back: "Back to list",
            save: "Save",
            edit: "Edit",
            copy: "Copy",
            copySuccess: "Assessment data copied to clipboard.",
            copyError: "Could not copy assessment data. Your browser may not support this operation.",
            configUpdated: "The assessment configuration has been updated",
            notConfigurable: "This assessment type is set up for automatic grading and is not configurable."
        },
        createAssessment: {
            label: "Create Assessment",
            create: "Create"
        },
        editAssessment: {
            label: "Edit Assessment",
            save: "Save",
            submitSuccess: "Changes have been saved.",
            submitError: "Please correct the errors in the form and resubmit.",
            assessmentContent: "Assessment Content",
            scores: {
                LOW: "Low Score",
                MEDIUM: "Medium Score",
                HIGH: "High Score",
                summary: {
                    LOW: "Low Score Summary",
                    MEDIUM: "Medium Score Summary",
                    HIGH: "High Score Summary"
                }
            },
            general: {
                label: "General",
                name: "Name",
                category: "Category",
                selectCategory: "Select a category",
                type: "Type",
                selectType: "Select a type",
                selectTypeFirst: "Please select an assessment type first",
                scoring: "Scoring",
                selectScoringType: "Select a scoring type",
                startingDifficulty: "Starting Difficulty",
                selectDifficulty: "Select a difficulty",
                minTakenGroups: "Min Taken Groups",
                maxTakenGroups: "Max Taken Groups",
                prereq: {
                    label: "Prerequisites",
                    add: "Add prerequisite",
                    remove: "Remove prerequisite",
                    category: "Category",
                    statuses: "Statuses",
                    reason: "Reason",
                    none: "No prerequisites"
                }
            },
            content: {
                label: "Content",
                landing: {
                    label: "Dashboard Tab",
                    description: "HTML content displayed in the myDAACS dashboard tab for the currently highlighted assessment."
                },
                start: {
                    label: "Start Page",
                    description: "HTML content displayed in the left-hand column of the \"splash\" screen that is displayed when the student starts a new assessment."
                },
                startTips: {
                    label: "Start Page Tips",
                    description: "HTML content displayed in the right-hand sidebar column of the \"splash\" screen that is displayed when the student starts a new assessment."
                },
                helpLabel: {
                    label: "Help Menu Text",
                    description: "Text that is displayed for the option in the \"Help\" menu that will open the help content dialog."
                },
                help: {
                    label: "Help Dialog",
                    description: "HTML content displayed in the overlay dialog that can be accessed by the student while taking the assessment via the \"Help\" menu."
                }
            },
            rubric: {
                label: "Rubric",
                description: "HTML content that is displayed in the assessment results index page, based on the stuent's overall score.",
                summary: "Summary",
                content: "Content",
                scoreTo: "to",
                inclusive: "Inclusive",
                exclusive: "Exclusive"
            },
            domains: {
                label: "Domains",
                add: "Add domain",
                edit: "Edit domain",
                type: "Type",
                name: "Name",
                noName: "No name provided",
                id: "ID",
                parent: "Parent Domain",
                noParent: "No parent domain",
                cannotBeSubdomain: "This domain has subdomains, and cannot have a parent domain.",
                none: "No domains found",
                scoreIsAvg: "Score is an average of its sub domains",
                remove: {
                    label: "Remove",
                    cancel: "Cancel",
                    confirm: "Are you sure you want to remove this domain?",
                    confirmMultiple: "Are you sure you want to remove this domain? Its subdomains will also be removed."
                },
                domain: {
                    label: "Domain",
                    info: "General Information",
                    description: "HTML content that is displayed at the top of the domain results page, no matter what score was given."
                }
            },
            questions: {
                label: "Questions",
                add: "Add question",
                edit: "Edit question",
                none: "No questions found",
                text: "Question text",
                noText: "No question text",
                questionNum: "Question {{num}}",
                domain: "Domain",
                selectDomain: "Select a domain",
                subdomains: "Subdomains",
                content: "Question content",
                FORMULA: "Formula",
                PASSAGE: "Passage",
                WORD: "Word Problem",
                selectAssessmentType: "You must select an assessment type first",
                import: {
                    label: "Import questions",
                    action: "Import questions...",
                    selectAssessment: "Select assessment",
                    likertAssessmentInstructions: "Select an existing Likert assessment to import questions from.",
                    catAssessmentInstructions: "Select an existing Multiple Choice or CAT assessment to import questions from.",
                    selectQuestions: "Select questions",
                    questionsInstructions: "Select the groups of questions your wish to import from the \"{{label}} <span class=\"text-muted\">({{date}})</span>\" assessment."
                },
                supplement: {
                    label: "Question supplement",
                    none: "No supplement",
                    hasContent: "Show supplement content",
                    imageExample: "https://example.com/image.jpg"
                },
                answers: {
                    label: "Answer",
                    answers: "Answers",
                    edit: "Edit answers",
                    add: "Add",
                    remove: "Remove",
                    addAnswer: "Add answer",
                    none: "No answers found",
                    points: "Points",
                    toggleEditor: "Toggle content editor"
                },
                feedback: {
                    label:  "Feedback",
                    supplement: "Feedback supplement"
                },
                writingPrompt: {
                    label: "Writing prompt",
                    description: "HTML content that is displayed above the text input for Writing assessments.",
                    minWords: "Minimum number of words"
                },
                likert: {
                    group: {
                        label: "Group {{num}}",
                        none: "No groups found",
                        add: "Add group",
                        edit: "Edit group",
                        options: "This Likert group uses the following answers (5 max):",
                        pointsDist: "Answer points distribution",
                        pointsFor: "points for <strong>{{option}}</strong>",
                        remove: {
                            label: "Remove",
                            cancel: "Cancel",
                            confirm: "Are you sure you want to remove this group?"
                        }
                    }
                },
                cat: {
                    group: {
                        label: "Group {{num}}",
                        none: "No groups found",
                        add: "Add group",
                        remove: {
                            label: "Remove",
                            cancel: "Cancel",
                            confirm: "Are you sure you want to remove this group?"
                        }
                    },
                    transitions: {
                        label: "Transitions",
                        transitionTo: "to",
                        inclusive: "Inclusive",
                        exclusive: "Exclusive",
                        infinity: "Infinity",
                        negInfinity: "-Infinity"
                    }
                },
                remove: {
                    label: "Remove",
                    cancel: "Cancel",
                    confirm: "Are you sure you want to remove this question?"
                }
            }
        },
        lightside: {
            modelFile: "LightSide model file",
            modelFiles: "LightSide model files",
            overallModel: "Overall model",
            fileInvalid: "The selected file must have a file type of .xml",
            uploadSuccess: "The LightSide model file was uploaded successfully."
        },
        import: {
            label: "Import",
            assessment: "Import assessment",
            save: "Save",
            file: "Assessment File",
            json: "Assessment JSON",
            definition: "Assessment definition",
            pasteJson: "Enter the assessment JSON data below",
            confirmSave: "Are you sure you want to import this as an active assessment? Remember to disable any currently active assessments as needed.",
            instructions: "Upload your assessment definition or copy/paste its contents into the field below",
            readFileError: "Unable to load the assessment JSON data from the selected file"
        },
        category: {
          label: "Assessment Categories",
          add: "Add category",
          edit: "Edit category",
          none: "No categories found",
          save: "Save",
          cancel: "Cancel",
          groupLabel: "Label",
          id: "ID",
          type: "Category Type",
          samlField: "SAML Field",
          samlValue: "SAML Value",
          samlInstructions: "SAML configuration is optional. If you provide a SAML field, you must also provide a value.",
          labelInstructions: "This label is for internal purposes only, and will not be visible to students.",
          remove: "Remove",
          removeConfirm: "Are you sure you want to remove this category?<br><br>Categories cannot be deleted if they have associated assessments.",
          removeError: "An error occurred while attempting to remove the category. Please make sure no assessments are associated with this category.",
          removeSuccess: "The assessment category has been removed successfully.",
          updateSuccess: "The assessment category has been updated successfully.",
          createSuccess: "The assessment category has been created successfully."
        }
    },
    assessment: {
        label: "Assessment",
        details: "Assessment details",
        learnMore: "Learn More",
        continue: "Continue",
        continueAssessment: "Continue Assessment",
        continueCurrent: "Continue Current Assessment",
        start: "Start",
        startAssessment: "Start Assessment",
        retake: "Retake Assessment",
        notStarted: "Not Started",
        inProgress: "In Progress",
        completed: "Completed",
        viewPreviousResults: "View previous results",
        doesNotExist: "Assessment does not exist",
        continueLater: "Continue Later",
        nextQuestion: "Next",
        cheatSheet: "Cheat Sheet",
        backToDashboard: "Back to myDAACS",
        unsavedWork: "You have unsaved work",
        confirmLeave: "Are you sure you want to leave? Your work on the current page has not been saved.",
        answerAllQuestions: "Please answer all questions before proceeding",
        youAreDone: "You're done!",
        finishedMessage: "Congratulations, you have completed the {{assessmentLabel}} assessment!",
        prerequisites: "Assessment Prerequisites",
        neverTaken: "You haven't taken this assessment yet.",
        isInProgress: "This assessment is still in progress. Please complete it to see your results.",
        notYetGraded: "This assessment has not yet been graded. Please check back later.",
        notYetGradedWriting: "Thank you for completing your DAACS writing assessment. We have provided a copy of your response below.",
        showResultsFrom: "Show Results From",
        selectCompletionDate: "Select a completion date",
        noCompletionsFound: "No completions found",
        checkForResults: "Check For Results",
        backToOverview: "Assessment overview",
        tips: "Helpful Tips",
        submitError: "Sorry, an error occurred while attempting to submit your response. Please try again or use the Help menu to notify an administrator.",
        help: {
            label: "Help",
            request: "Request Help",
            body: "Body",
            submit: "Submit",
            thanks: "Thanks!",
            requestReceived: "Your help request has been received. An administrator will contact you shortly to assist with this request."
        },
        smallDevice: {
            title: "Your device is too small to view this page",
            message: "In order to ensure that the questions and related content are displayed properly, you must use a larger device, such as a tablet or desktop computer, to take this assessment. (992px minimum horizontal resolution)",
            useLandscape: "If you are on a tablet, try rotating your device to view this page in landscape mode."
        },
        writingPrompt: {
            placeholder: "Type your response here",
            savingChanges: "Saving changes...",
            changesSaved: "Your changes have been saved.",
            meetMinWords: "You must meet the minimum words requirement before proceeding",
            minWords: {
                one: "Minimum 1 word",
                other: "Minimum {{count}} words"
            },
            reqWords: {
                one: "1 more word required",
                other: "{{count}} more words required"
            }
        },
        performance: {
            low: "Low Performance",
            medium: "Medium Performance",
            high: "High Performance",
            notGraded: "Not Graded"
        },
        domain: {
            overview: "Overview",
            domainOverview: "Domain Overview",
            moreInfo: "More Info",
            lessInfo: "Less Info",
            yourPerformance: "Your Performance",
            questions: "Questions",
            itemIsCorrect: "You got this item correct.",
            correctAnswerIs: "The correct answer is",
            answerIs: "The answer is",
            yourAnswerWas: "Your answer was",
            yourAnswer: "Your answer",
            viewImage: "View image",
            yourResponse: "Your Response",
            questionDetails: "Question Details",
            feedback: "Feedback",
            correct: "Correct",
            incorrect: "Incorrect"
        },
        viewItemContent: {
            WORD: "View word problem",
            FORMULA: "View formula",
            PASSAGE: "View reading passage"
        }
    },
    cookies: {
        title: "Please Enable Cookies",
        message: "This site requires cookies to be enabled. Please correct your browser settings to enable cookies and refresh this page to continue.",
        close: "Close"
    },
    serverError: {
        title: "Server Error",
        msg: "Sorry, the server encountered an error while attempting to process your request.",
        codes: {
            MongoDB: {
                requestFailed: "We're having trouble completing your request...please try again in a moment."
            },
            javaMailSender: {
                requestFailed: "We're having trouble completing your request...please try again in a moment."
            },
            Assessment: {
                constraintViolation: {
                    assessmentCategory: {
                        NotNull: "The assessment category can't be blank.",
                        ValidBaseAssessment: "The selected category is not compatible with the assessment type."
                    },
                    assessmentType: {
                        NotNull: "The assessment type can't be blank.",
                        ValidBaseAssessment: "The selected assessment type is not valid."
                    },
                    content: {
                        NotNull: "The assessment content can't be blank."
                    },
                    domains: {
                        content: {
                            NotNull: "The domain General Information content can't be blank."
                        },
                        domainType: {
                            NotNull: "The domain type can't be blank."
                        },
                        id: {
                            NotNull: "The domain ID can't be blank."
                        },
                        label: {
                            NotNull: "The domain label can't be blank."
                        },
                        rubric: {
                            ValidBaseAssessment: "The rubric score configuration for the domain is not valid."
                        },
                        ValidBaseAssessment: "Domain IDs must be unique.",
                        ValidWritingAssessment: "Domain must contain a rubric if not scored by an average of its sub-domains"
                    },
                    itemGroups: {
                        domainID: {
                            ValidCATAssessment: "The provided domain for a question group is not valid."
                        },
                        ValidCATAssessment: "The question group configuration is not valid. Please make sure there is a correct number of groups per difficulty.",
                        items: {
                            itemContent: {
                                NotNull: "The question content can't be blank."
                            },
                            question: {
                                NotNull: "The question text can't be blank."
                            },
                            domainId: {
                                NotNull: "The question domain can't be blank."
                            },
                            possibleItemAnswers: {
                                content: {
                                    NotNull: "The question answer content can't be blank."
                                },
                                score: {
                                    NotNull: "The question answer score can't be blank."
                                }
                            }
                        },
                        possibleItemAnswers: {
                            content: {
                                NotNull: "The question group answer content can't be blank."
                            }
                        },
                        Size: "The assessment must have at least 1 question group",
                        ValidWritingAssessment: "An question group's lowest possible score is same as highest possible score."
                    },
                    itemGroupTransitions: {
                        transitionMap: {
                            ValidCATAssessment: "The question group transition map has a gap in its coverage."
                        },
                        ValidCATAssessment: "All question groups must have the same number of questions."
                    },
                    label: {
                        NotNull: "The assessment label can't be blank."
                    },
                    lightSideConfig: {
                        domainModels: {
                            ValidWritingAssessment: "A valid lightside configuration file must be provided for each domain."
                        },
                        ValidWritingAssessment: "A valid lightside configuration file must be provided for each domain."
                    },
                    maxTakenGroups: {
                        ValidCATAssessment: "Max taken groups must be equal to or larger than the min taken groups."
                    },
                    minTakenGroups: {
                        ValidCATAssessment: "Min taken groups must be larger than 0."
                    },
                    numQuestionsPerGroup: {
                        Min: "All groups must have the same number of questions, and there must be at least one question per group."
                    },
                    overallRubric: {
                        completionScoreMap: {
                            NotNull: "The rubric score configuration can't be blank.",
                            ValidWritingAssessment: "Writing assessments cannot have a rubric score configuration."
                        },
                        supplementTable: {
                            completionScore: {
                                NotNull: "The rubric score configuration can't be blank."
                            },
                            content: {
                                NotNull: "The rubric score content can't be blank."
                            },
                            ValidWritingAssessment: "The rubric does not contain score supplement information."
                        },
                        ValidBaseAssessment: "The rubric score configuration is not valid.",
                        ValidWritingAssessment: "The rubric score configuration is not valid."
                    },
                    prerequisites: {
                        assessmentCategory: {
                            NotNull: "A category must be selected for the assessment prerequisite."
                        },
                        prereqType: {
                            NotNull: "The assessment prerequisite type can't be blank."
                        },
                        reason: {
                            NotNull: "The assessment prerequisite reason can't be blank."
                        }
                    },
                    scoringType: {
                        ValidWritingAssessment: "The selected scoring type is not compatible with the assessment type.",
                        NotNull: "The scoring type can't be blank.",
                        ValidBaseAssessment: "The selected scoring type is not compatible with the assessment type."
                    },
                    startingDifficulty: {
                        NotNull: "The starting difficulty can't be blank."
                    },
                    writingPrompt: {
                        content: {
                            NotNull: "The writing prompt content can't be blank."
                        },
                        minWords: {
                            NotNull: "The writing prompt minimum words can't be blank."
                        }
                    }
                }
            }
        }
    },
    dashboard: {
        label: "myDAACS"
    },
    about: {
        label: "About",
        intro: "DAACS is funded by the Department of Education in the Fund for the Improvement of Postsecondary Education First in the World grant program. Excelsior College is working in partnership with Western Governors University, Rutgers University, and the University at Albany. DAACS is an open source project. Institutions are free to use and adapt DAACS for the specific needs of their students.",
        colleges: {
            excelsior: "Excelsior College",
            wgu: "Western Governors University",
            rutgers: "Rutgers",
            ualbany: "University of Albany"
        },
        news: {
            label: "In the News!",
            grantAwarded: "Excelsior College awarded $2.9 million grant to assess student skills, predict future success",
            measuringSkills: "Measuring Academic Skills and ‘Grit’ to Help Identify At-Risk Students",
            firstInWorldGrants: "Department Awards $60 Million in First in the World Grants to 17 Colleges, Universities and Organizations",
            developingTool: "Excelsior College Developing Student Skills Assessment Tool",
            beyondRemediation: "Beyond Remediation: Using Technology to Maximize Retention and Completion",
            chronicle: "The Chronicle of Higher Education",
            deptEd: "Department of Education",
            campusTech: "Campus Technology",
            evolllution: "The Evolllution"
        },
        personnel: {
            projDirector: {
                label: "Project Director",
                jBryer: "Jason Bryer, Ph.D., Excelsior College"
            },
            coProjDirector: {
                label: "Co-Project Directors",
                tCleary: "Timothy Cleary, Ph.D., Rutgers University",
                hAndrade: "Heidi Andrade, Ed.D., University at Albany"
            },
            evaluator: {
                label: "Evaluator",
                bStorandt: "Barbara Storandt, ALTA Solutions Group, LLC"
            },
            advisory: {
                label: "Advisory Committee",
                gBraddock: "Glenn Braddock, Ph.D., Excelsior College",
                lDaniels: "Lisa Daniels, Ph.D., Excelsior College",
                rDugan: "Ronald Dugan, Ph.D., The College of Saint Rose",
                pJones: "Patrick Jones, Ph.D., Excelsior College",
                jLevin: "Jason Levin, MBA, Western Governors University",
                dWalsh: "Darren Walsh, Excelsior College",
                pWinne: "Phil Winne, Ph.D., Simon Fraser University"
            },
            other: {
                label: "Other Personnel",
                mVerdi: "Marc Verdi, Project Manager",
                jWeyers: "Jane Weyers, Grants",
                bBarros: "Bethany de Barros, Grants",
                pCroop: "Patti Croop, Grants",
                dAiken: "Donn Aiken, Information Technology",
                cDow: "Clayton Dow, Fiscal",
                cValle: "Chris Valle, Ph.D., Analytics",
                fCrocco: "Francesco Crocco, Ph.D., Subject Matter Expert",
                aHerzig: "Abbe Herzig, Ph.D., Subject Matter Expert",
                aLui: "Angela Lui, M.S.",
                dAkhmedjanova: "Diana Akhmedjanova, M.S.",
                kHogan: "Kara Hogan, Ph.D.",
                dFranklin: "David Franklin, M.S."
            }
        }
    },
    student: {
        select: "Select a student",
        search: "Search students...",
        noneFound: "No students found"
    },
    select: {
        loading: "Loading..."
    },
    home: {
        label: "Home",
        signIn: "Sign in to get started",
        slogan: "DAACS is a diagnostic assessment designed to help students transition to college. DAACS provides personalized feedback about students’ strengths and weaknesses in terms of key academic and self-regulated learning skills, linking them to the resources to help them be successful students.",
        progress: {
            label: "DAACS Progress",
            complete: "Students complete DAACS online, at their own pace.",
            feedback: "Once done, students receive immediate, personalized feedback.",
            resources: "DAACS results help students pick the right courses and provides resources that can bolster college skills.",
            success: "Students who have the skills to be successful in their first courses are more likely to complete college."
        },
        measure: {
            label: "Measure",
            content: "DAACS assesses critical college skills.",
            srl: "Self-Regulated Learning",
            writing: "Writing",
            mathematics: "Mathematics",
            reading: "Reading"
        },
        learn: {
            label: "Learn",
            content: "After completing DAACS, students receive immediate feedback about their strengths while identifying areas in need of improvement"
        },
        support: {
            label: "Support",
            content: "Students are directed to resources designed to promote skill development",
            writingLab: "Online Writing Lab",
            coaches: "Coaches, Advisors & Faculty",
            resources: "Open Education Resources"
        },
        rethink: {
            label: "Rethinking Placement Exams",
            content: "Traditional placement exams are high stakes assessments on which students receive either a passing or failing grade. Those who fail are placed into costly remediation courses that delay progress. In contrast, DAACS provides students with detailed information and feedback on their preparation for college-level work, as well as resources for shoring it up. Students can build needed skills while enrolled in courses that lead to the completion of their degrees."
        },
        assess: {
            label: "Assessing the Whole Student",
            content: "Current research suggests that mindset, self-regulated learning, and grit are better predictors of college success than traditional placement or entrance exams. DAACS will assess these and provide students with strategies to be a more successful college student."
        },
        analysis: {
            label: "Predictive Analytics",
            content: "Data provided by DAACS can increase the efficacy of predictive analytic models. These data will not only help institutions identify their most academically at-risk students, but also provide specific information as to why they are at risk. With this information, more targeted interventions can be developed that better serve students’ needs."
        }
    },
    footer: {
        slogan: "DAACS is a diagnostic assessment designed to help students transition to college. DAACS provides personalized feedback and links to resources to help them be successful students.",
        disclaimer: "The contents of this website were developed under grant #P116F150077 from the U.S. Department of Education. However, those contents do not necessarily represent the policy of the U.S. Department of Education, and you should not assume endorsement by the Federal Government."
    },
    tables: {
        noResults: "No results found"
    },
    truncateText: {
        seeMore: "See More",
        seeLess: "See Less"
    },
    fileUpload: {
        noneChosen: "No file chosen",
        select: "Select file...",
        uploading: "Uploading, please wait..."
    },
    confirmation: {
        continue: "Are you sure you want to continue?",
        yes: "Yes",
        no: "No"
    },
    skipNavigation: {
        label: "Skip to main content"
    },
    unknown: {
        unexpected: "Sorry, an unexpected error has occurred."
    }
};
