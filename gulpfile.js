(function() {
  "use strict";
  var gulp = require("gulp");
  var spsave = require("gulp-spsave");

  var spsaveCoreOptions = {
    siteUrl : "<dev-spweb-url/addin-name",
    folder: "App/dist",
    checkin: false,
    checkinType: 1,
    flatten: false,
    notification: false

  };

  var spsaveCredential = {
    username: "DOMAIN\\COMPTE-DE-SERVICE",
    password: "PASSWORD"
  };

  gulp.task("upload", function() {
    return gulp.src("./App/dist/**/*").pipe(spsave(spsaveCoreOptions, spsaveCredential));
  });

})();
