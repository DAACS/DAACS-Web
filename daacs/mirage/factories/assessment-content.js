import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    assessmentId: faker.list.cycle(
        'b494033d-0a8a-42fc-b285-80418d210f64', //MATH
        'b64c750c-208d-4d0e-88f0-14ac48206cec', //READING
        '9cdf30bc-5717-4b1a-92d1-eb163c764df3', //WRITING
        'dda7b692-ff3f-421b-8683-79058f61a953'  //SRL
    ),
    assessmentCategory: faker.list.cycle(
        'MATHEMATICS',
        'READING',
        'WRITING',
        'COLLEGE_SKILLS'
    ),
    assessmentType: faker.list.cycle(
        'CAT',
        'CAT',
        'WRITING_PROMPT',
        'LIKERT',
    ),
    label: faker.list.cycle(
        'Mathematics',
        'Reading',
        'Writing',
        'College Skills'
    ),
    content: faker.list.cycle(
        {
            landing: "<img src=\"https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg\"  class=\"pull-right\" style=\"padding:20px 0 20px 20px; max-width:400px;\"><p>This is additional info about the Mathematics assessment.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras condimentum interdum convallis. Donec pulvinar dolor sed congue tincidunt. Duis ultrices dictum imperdiet. Duis egestas ligula non tortor sagittis tristique. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec lacinia nibh sapien, in dictum eros ultricies ut. Nunc condimentum arcu lacus, ac tincidunt tortor malesuada et. Proin nulla sem, placerat eget dapibus sit amet, pellentesque eu enim. Quisque id neque elit. Nulla vitae finibus odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ultrices orci neque, mattis finibus velit maximus sit amet. Donec semper felis vitae diam ultrices porta. Nam viverra fermentum est at placerat. Aliquam tempor quam nec pellentesque mattis. Nunc at ante pretium, vestibulum dolor quis, condimentum justo.</p><h3>Nam ac blandit ante</h3><p>Nam ac blandit ante. Proin feugiat purus id nunc pretium consectetur. Vestibulum sodales sed massa sit amet mattis. Morbi aliquam, tellus id hendrerit sodales, nibh sapien fringilla nisl, vitae gravida nunc metus sit amet justo. Integer dictum viverra justo, sed consequat odio vestibulum sed. Donec ac diam eget est condimentum tempus a sit amet neque. Nullam nunc magna, ultricies id enim vel, ultrices ornare odio. Donec eleifend, nibh vehicula euismod interdum, turpis odio fringilla diam, et fermentum arcu justo et tellus. Morbi in pellentesque odio. Quisque vel elit at velit luctus gravida. Aliquam blandit convallis magna, at cursus est ultrices id. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus malesuada vehicula sagittis. Cras at faucibus augue, dapibus ornare ipsum. Vivamus quis feugiat libero, non tempor ipsum.</p>",
            start: "<p>This is the intro page for starting a new Mathematics assessment. It could contain some generic info about taking the assessment, or content specific to the assessment type. The user would also see the \"tutorial\" UI at this point.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu porta mauris. Etiam convallis, mauris quis lobortis molestie, eros sapien elementum nisl, fringilla interdum risus orci vitae nibh. Proin ut erat odio. Vestibulum varius quis nisi et aliquam. Nulla auctor ullamcorper ornare. Nulla dignissim auctor risus sed sodales. Proin elementum elit quis quam tincidunt, ac congue felis commodo. Aliquam erat volutpat. Fusce eget justo sit amet magna porta feugiat quis blandit enim. Phasellus in purus ut felis dapibus mattis. Morbi posuere hendrerit mauris nec molestie. In nibh magna, fermentum ac dictum quis, rhoncus a nunc.</p>",
            startTips: "<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla velit ut egestas placerat. Fusce efficitur lorem efficitur ante rutrum, vel vehicula ex ultricies.</li><li>Donec lorem nibh, maximus sed lobortis in, fringilla nec tortor.</li><li>Sed faucibus tellus metus, vel facilisis nibh faucibus vitae. Suspendisse mauris tortor, aliquam a facilisis at, vehicula a diam.</li><li>Fusce vel massa sed lectus viverra dapibus quis eu odio. Sed pharetra rhoncus massa, ut commodo nunc egestas non.</li></ul>",
            helpLabel: "Helpful Formulas",
            help: "<p>Mathematics cheat sheet content goes here.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra sem at justo faucibus rhoncus. Suspendisse posuere scelerisque dignissim. Mauris vehicula velit nec elit viverra, quis interdum nunc elementum. Curabitur nisi nisl, cursus sit amet augue nec, cursus ultrices orci.</p><p>Here's a formula to help you out</p><p>$$\\left [ – \\frac{\\hbar^2}{2 m} \frac{\\partial^2}{\\partial x^2} + V \\right ] \\Psi = i \\hbar \\frac{\\partial}{\\partial t} \\Psi$$</p><p>Suspendisse sed blandit tellus. Vestibulum nec viverra enim. Fusce vitae urna eget odio sodales consequat. Vivamus fermentum justo a massa laoreet, at volutpat urna bibendum. Suspendisse tincidunt dignissim fringilla. Donec porta tempus feugiat. Integer eget velit luctus, egestas libero vulputate, vehicula sem.</p><p>Here's some helpful images</p><div class=\"row\"><div class=\"col-xs-6\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/d/db/R-basic_cars_plot_example.svg\" class=\"img-responsive\" alt=\"first figure\"></div><div class=\"col-xs-6\"><img src=\"http://www.oswego.edu/~srp/stats/images/npp_1b.gif\" class=\"img-responsive\" alt=\"second figure\"></div></div><p>Nullam pretium rutrum pellentesque. Fusce quis lorem dui. Sed interdum sit amet quam ut vestibulum. Sed a faucibus velit. Vivamus facilisis libero sit amet erat scelerisque, id posuere ex hendrerit. Ut placerat egestas sapien eu sollicitudin. Integer porta, dui a fermentum dignissim, nisl augue consectetur ex, ac blandit dui nisi nec eros. Vivamus suscipit imperdiet ultrices. Vivamus in lorem congue, congue eros venenatis, posuere leo. Pellentesque neque nunc, pulvinar sit amet sapien in, iaculis vehicula elit. Sed est eros, egestas consectetur convallis tincidunt, vulputate id est. Phasellus tempus libero sed sem accumsan porta. Quisque semper sed quam nec auctor. Pellentesque sed condimentum turpis, sit amet convallis nibh.</p><h2>Section Header</h2><p>Maecenas malesuada, dolor quis sollicitudin faucibus, nibh est aliquam nunc, non rhoncus nisl urna non lorem. Mauris egestas vulputate accumsan. In risus diam, interdum vel laoreet at, luctus vitae orci. Vivamus ullamcorper pellentesque ante, quis auctor sapien sollicitudin sit amet. Sed sed vehicula nunc. Etiam consectetur porta enim fermentum vehicula. Donec vitae iaculis est. Etiam varius, nunc id aliquet aliquet, sapien elit pulvinar turpis, id dictum neque sem nec risus. Nunc facilisis urna ut mauris malesuada mattis. Vestibulum auctor eget mi vitae suscipit. Sed tempus volutpat iaculis. In lobortis justo id est congue, id semper arcu feugiat. Curabitur aliquet velit a interdum pellentesque.</p>"
        }
    ),
    domains: faker.list.cycle(
        [
          {
            id: "algebra",
            label: "Algebra",
            rubric: {
              completionScoreMap: {
                LOW: "[0.0,0.334)",
                MEDIUM: "[0.334,0.667)",
                HIGH: "[0.667,1.0]"
              },
              supplementTable: [
                  {
                    completionScore: "LOW",
                    content: "This is the Algebra domain feedback for LOW. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lobortis eros. Donec urna purus, imperdiet et efficitur ut, placerat congue turpis. Integer sit amet urna tellus. Quisque vulputate nunc eget arcu fringilla, eu iaculis metus vestibulum. Fusce in odio tincidunt, efficitur leo in, sodales lacus. Phasellus felis purus, vulputate et arcu sed, fermentum dictum dui. Donec mollis risus in vulputate tempus. Nunc finibus nec mi non sodales. Sed vulputate viverra magna ut luctus."
                  },
                  {
                    completionScore: "MEDIUM",
                    content: "This is the Algebra domain feedback for MEDIUM. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lobortis eros. Donec urna purus, imperdiet et efficitur ut, placerat congue turpis. Integer sit amet urna tellus. Quisque vulputate nunc eget arcu fringilla, eu iaculis metus vestibulum. Fusce in odio tincidunt, efficitur leo in, sodales lacus. Phasellus felis purus, vulputate et arcu sed, fermentum dictum dui. Donec mollis risus in vulputate tempus. Nunc finibus nec mi non sodales. Sed vulputate viverra magna ut luctus."
                  },
                  {
                    completionScore: "HIGH",
                    content: "This is the Algebra domain feedback for HIGH. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lobortis eros. Donec urna purus, imperdiet et efficitur ut, placerat congue turpis. Integer sit amet urna tellus. Quisque vulputate nunc eget arcu fringilla, eu iaculis metus vestibulum. Fusce in odio tincidunt, efficitur leo in, sodales lacus. Phasellus felis purus, vulputate et arcu sed, fermentum dictum dui. Donec mollis risus in vulputate tempus. Nunc finibus nec mi non sodales. Sed vulputate viverra magna ut luctus."
                  }
              ]
            }
          },
          {
            id: "advanced_calculus",
            label: "Advanced Calculus",
            rubric: {
              completionScoreMap: {
                LOW: "[0.0,0.334)",
                MEDIUM: "[0.334,0.667)",
                HIGH: "[0.667,1.0]"
              },
              supplementTable: [
                {
                  completionScore: "LOW",
                  content: "This is the Advanced Calculus domain feedback for LOW. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lobortis eros. Donec urna purus, imperdiet et efficitur ut, placerat congue turpis. Integer sit amet urna tellus. Quisque vulputate nunc eget arcu fringilla, eu iaculis metus vestibulum. Fusce in odio tincidunt, efficitur leo in, sodales lacus. Phasellus felis purus, vulputate et arcu sed, fermentum dictum dui. Donec mollis risus in vulputate tempus. Nunc finibus nec mi non sodales. Sed vulputate viverra magna ut luctus."
                },
                {
                  completionScore: "MEDIUM",
                  content: "This is the Advanced Calculus domain feedback for MEDIUM. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lobortis eros. Donec urna purus, imperdiet et efficitur ut, placerat congue turpis. Integer sit amet urna tellus. Quisque vulputate nunc eget arcu fringilla, eu iaculis metus vestibulum. Fusce in odio tincidunt, efficitur leo in, sodales lacus. Phasellus felis purus, vulputate et arcu sed, fermentum dictum dui. Donec mollis risus in vulputate tempus. Nunc finibus nec mi non sodales. Sed vulputate viverra magna ut luctus."
                },
                {
                  completionScore: "HIGH",
                  content: "This is the Advanced Calculus domain feedback for HIGH. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lobortis eros. Donec urna purus, imperdiet et efficitur ut, placerat congue turpis. Integer sit amet urna tellus. Quisque vulputate nunc eget arcu fringilla, eu iaculis metus vestibulum. Fusce in odio tincidunt, efficitur leo in, sodales lacus. Phasellus felis purus, vulputate et arcu sed, fermentum dictum dui. Donec mollis risus in vulputate tempus. Nunc finibus nec mi non sodales. Sed vulputate viverra magna ut luctus."
                }
              ]
            }
          }
        ]
    ),
    overallRubric: faker.list.cycle(
        {
          completionScoreMap: {
            "LOW": "[0.0,0.334)",
            "MEDIUM": "[0.334,0.667)",
            "HIGH": "[0.667,1.0]"
          },
          supplementTable: [
            {
              completionScore: "LOW",
              content: "This is the overall assessment feedback content for LOW. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis nunc in tempor aliquam. Nunc lacinia quam diam, at efficitur arcu ullamcorper cursus. Donec mauris purus, eleifend nec aliquet eget, tempus efficitur velit."
            },
            {
              completionScore: "MEDIUM",
              content: "This is the overall assessment feedback content for MEDIUM. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis nunc in tempor aliquam. Nunc lacinia quam diam, at efficitur arcu ullamcorper cursus. Donec mauris purus, eleifend nec aliquet eget, tempus efficitur velit."
            },
            {
              completionScore: "HIGH",
              content: "This is the overall assessment feedback content for HIGH. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis nunc in tempor aliquam. Nunc lacinia quam diam, at efficitur arcu ullamcorper cursus. Donec mauris purus, eleifend nec aliquet eget, tempus efficitur velit."
            }
          ]
        }
    )
});
