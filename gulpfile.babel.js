import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import changed from "gulp-changed";
import responsive from "gulp-responsive";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";

const browserSync = BrowserSync.create();
const hugoBin = "hugo";
const defaultArgs = ["-d", "../dist", "-s", "site", "-v"];

gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));

gulp.task("build", ["css", "js", "hugo"]);
gulp.task("build-preview", ["css", "js", "hugo-preview"]);
gulp.task("photos", ["thumbnails", "previews"]);

gulp.task("css", () => (
  gulp.src("./src/css/*.css")
    .pipe(postcss([cssImport({from: "./src/css/main.css"}), cssnext()]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

gulp.task('photo:preview', () => (
  gulp.src('./site/static/photos/**/*.jpg')
    //.pipe(changed('./site/static/generated/previews/photos'))
    .pipe(responsive({
      '**/*.jpg': [{
        width: 15,
        height: 10,
        quality: 50,
        max: true
      }]
    }))
    .pipe(gulp.dest('./site/static/generated/previews/photos'))
));

gulp.task('photo:thumbnail', () => (
  gulp.src('./site/static/photos/**/*.jpg')
    //.pipe(changed('./site/static/generated/thumbails/photos'))
    .pipe(responsive({
      '**/*.jpg': [{
        width: 420,
        height: 280,
        quality: 50,
        max: true,
      }]
    }))
    .pipe(gulp.dest('./site/static/generated/thumbnails/photos'))
));

gulp.task('photo', ['photo:preview', 'photo:thumbnail'], () => {

});

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

gulp.task("server", ["hugo-preview", "css", "js"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/css/**/*.css", ["css"]);
  gulp.watch("./site/**/*", ["hugo-preview"]);
});

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
