//加载gulp模块
var gulp = require('gulp'); 
//其它gulp模块可直接用$引用，而不必声明变量
var $ = require('gulp-load-plugins')();
var open = require('open');
//定义源目录、开发目录、生产目录
var app = {
	srcPath : 'src/',
	devPath : 'build/',
	prdPath : 'dist/'
};
//从源目录复制框架、插件到开发和生产目录
gulp.task('lib' , function () {
	gulp.src('bower_components/**/*.js')
		.pipe(gulp.dest(app.devPath + 'vendor'))
		.pipe(gulp.dest(app.prdPath + 'vendor'))
		.pipe($.connect.reload())
	})
//从源目录复制html文件到开发和生产目录
gulp.task('html' , function () {
	gulp.src(app.srcPath + '**/*.html')
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.prdPath))
		.pipe($.connect.reload())
	})
//从源目录复制数据到开发和生产目录
gulp.task('json' , function () {
	gulp.src(app.srcPath + 'data/**/*.json')
		.pipe(gulp.dest(app.devPath + 'data'))
		.pipe(gulp.dest(app.prdPath + 'data'))
		.pipe($.connect.reload())
	})
//编译less并压缩
gulp.task('less' , function () {
	gulp.src(app.srcPath + 'style/index.less')
		.pipe($.less())
		.pipe(gulp.dest(app.devPath + 'css'))
		.pipe($.cssmin())
		.pipe(gulp.dest(app.prdPath + 'css'))
		.pipe($.connect.reload())
	})
//合并js文件并压缩
gulp.task('js' , function () {
	gulp.src(app.srcPath + 'script/**/*.js')
		.pipe($.concat('index.js'))
		.pipe(gulp.dest(app.devPath + 'js'))
		.pipe($.uglify())
		.pipe(gulp.dest(app.prdPath + 'js'))
		.pipe($.connect.reload())
	}) 
//压缩图片
gulp.task('image' , function () {
	gulp.src(app.srcPath + 'image/**/*')
		.pipe(gulp.dest(app.devPath + 'image'))
		.pipe($.imagemin())
		.pipe(gulp.dest(app.prdPath + 'image'))
		.pipe($.connect.reload())
	})
//将所有任务集合为一个任务
gulp.task('build' , ['lib','html','json','less','js','image'])
//清除开发和生产目录，避免旧文件对新文件产生影
gulp.task('clean' , function () {
	gulp.src([app.devPath,app.prdPath])
		.pipe($.clean())
	})
//如果js或css或其他文件有任何改动，网页就会自动加载，不用自己手动去按Ctrl+R或者什么F5
//启动一个服务器，livereload只适应高级浏览器，IE8-不可以
gulp.task('serve' , ['build'] , function () {
	$.connect.server({
		root : [app.devPath],
		livereload : true,
		port : 1234
		});

	open('http://localhost:1234');
	//监听文件变化，启动对应任务
	gulp.watch('bower_components/**/*' , ['lib']);
	gulp.watch(app.srcPath + '**/*.html' , ['html']);
	gulp.watch(app.srcPath + 'data/**/*.json' , ['json']);
	gulp.watch(app.srcPath + 'style/**/*.less' , ['less']);
	gulp.watch(app.srcPath + 'script/**/*.js' , ['js']);
	gulp.watch(app.srcPath + 'imgae/**/*' , ['image']);
	})
//只需执行gulp命令即可（默认任务）
gulp.task('default' , ['serve'])