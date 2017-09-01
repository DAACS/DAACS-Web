/*jshint node:true*/
var runningInTeamcity = !!process.env.TEAMCITY_VERSION;

module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "reporter": runningInTeamcity ? "teamcity" : undefined,
  "launch_in_ci": [
    "PhantomJS"
  ],
  "launch_in_dev": [
    "PhantomJS",
    "Chrome"
  ]
};
