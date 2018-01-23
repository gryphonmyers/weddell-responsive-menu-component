var browserify = require('browserify');
var fs = require('fs');
var UglifyJS = require('uglify-es');

try {
    [{
        babelify: false,
        minify: false,
        output: './dist/weddell-responsive-menu-component.es6.js'
    }, {
        babelify: true,
        minify: false,
        output: './dist/weddell-responsive-menu-component.js'
    },{
        babelify: true,
        minify: true,
        output: './dist/weddell-responsive-menu-component.min.js'
    },{
        babelify: false,
        minify: true,
        output: './dist/weddell-responsive-menu-component.es6.min.js'
    }].forEach(function(opts){
        var b = browserify('src/index.js', {
            standalone: 'WeddellResponsiveMenu'
        })
        b.transform('pugvdomify', {
            global: true
        });
        var plugin = [
            'postcss-cssnext'
        ];
        if (opts.minify) {
            plugin.push('cssnano');
        }
        b.transform('browserify-postcss', {
            global: true,
            plugin
        })
        if (opts.babelify) {
            b.transform('babelify', {
                global: true,
                presets: [
                    ["env", {
                        targets: {
                            browsers: {
                                ie: 10
                            }
                        }
                    }]
                ]
            });
        }
        b.bundle((err,data) => {
            var str = data.toString();
            if (opts.minify) {
                str = UglifyJS.minify(str).code;
            }
            fs.writeFile(opts.output, str, function(){
                console.log("Done bundling", opts.output);
            });
        })
    })
    
} catch(err) {
    console.error(err.stack);
    process.exit(1);
}
