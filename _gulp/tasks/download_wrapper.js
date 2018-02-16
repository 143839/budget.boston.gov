var gulp          = require('gulp');
var download      = require("gulp-download-stream");
var injectElement = require('gulp-inject-element');
var streamify     = require('gulp-streamify');

gulp.task('download_wrapper', function (done) {
  download({
    file: "bos_wrapper.html",
    url: "https://boston.gov/api/v1/layouts/generic"
  })
  .pipe(streamify(injectElement({
        uses: 'dom',
        find: [
          //'base', 
          'title'
        ],
        injectStrings: [
          //'<base href="{{ site.url }}">', 
          '<title>{{ page.title }} | {{ site.title }}</title><link rel="stylesheet" href="{{ site.url }}/assets/css/main.css"><meta version="{{ page.source_version }}" year="{{ page.source_year }}">'
        ]
      }))
  )
  .pipe(gulp.dest("_layouts/"));

});
