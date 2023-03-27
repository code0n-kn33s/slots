'use strict';

const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
const glob = require('glob');
const fs = require('fs');

function slotsManifest(paths) {
    let ret = {};
    paths.forEach(function(path) {
        const revisionName1 = path
            .split('/')
            .slice(1).join('/');
        const revisionName = path
            .split('/')
            .slice(3)
            .join('/'); //cut ./public/slots/slotSysname from path
        ret[revisionName.replace(/\-[a-f0-9]*\./, '.')] = `/${revisionName1}`;
    });
    return ret;
}
function mainManifest(paths) {
    let ret = {};
    paths.forEach(function(path) {
        const revisionName = path
            .split('/')
            .slice(1)
            .join('/'); //cut ./public/slots/slotSysname from path
        ret[revisionName.replace(/\-[a-f0-9]*\./, '.')] = revisionName;
    });
    return ret;
}

module.exports = (env = {}, argv) => {
    return {
        entry: {
            controller: './src/events/eventController.js',
            main: './src/lobby/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js'
        },
        mode: 'development',
        devtool: 'inline-source-map',
        plugins: [
            new HtmlWebPackPlugin({
                template: './src/index.html'
            }),
            new CopyPlugin([
                {
                    from: `src/slots/games/alleycats/**`,
                    to: `games/alleycats/[name].[ext]`,
                    ignore: ['*.woff*']
                },
                {
                    from: `src/slots/games/kingsandqeens/**`,
                    to: `games/kingsandqueens/[name].[ext]`,
                    ignore: ['*.woff*']
                },
                {
                    from: `src/slots/games/snowhoneys/**`,
                    to: `games/snowhoneys/[name].[ext]`,
                    ignore: ['*.woff*']
                },
                {
                    from: `src/slots/games/spikesniteout/**`,
                    to: `games/spikesniteout/[name].[ext]`,
                    ignore: ['*.woff*']
                },
                {
                    from: `src/slots/games/lovepotion/**`,
                    to: `games/lovepotion/[name].[ext]`,
                    ignore: ['*.woff*']
                },
                {
                    from: `src/slots/games/sirwinsalot/**`,
                    to: `games/sirwinsalot/[name].[ext]`,
                    ignore: ['*.woff*']
                }
            ]),
            new webpack.HotModuleReplacementPlugin(),
            {
                apply: compiler => {
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
                        let manifest;
                        const slots = ['alleycats', 'kingsandqueens', 'snowhoneys', "spikesniteout", "lovepotion", "sirwinsalot"];
                        for (let index in slots) {
                            const name = slots[index];
                            console.log(name);
                            const path = 'dist/games/' + name + '/*.*';
                            manifest = slotsManifest(glob.sync(path));
                            console.log(manifest);
                            fs.writeFile(
                                'dist/games/' + name + '/manifest.json',
                                JSON.stringify(manifest),
                                function() {console.log('Error write file ')}
                            );
                        }
                        const path = 'dist/*.*';
                        manifest = mainManifest(glob.sync(path));
                        fs.writeFile(
                            'dist/manifest.json',
                            JSON.stringify(manifest),
                            function() {console.log('Error write file ')}
                        );
                    });
                }
            }
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            inline: true,
            hot: true,
            open: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            historyApiFallback: {
                index: 'index.html'
            },
            proxy: {
                '/lobby': {
                    target: 'https://clickfunstage.com/',
                    secure: false,
                    changeOrigin: true
                },
                '/proxy': {
                    target: 'https://clickfunstage.com/',
                    secure: false,
                    changeOrigin: true
                },
                '/slot_games_resources': {
                    target: 'https://clickfunstage.com/',
                    secure: false,
                    changeOrigin: true
                }
            }
        },
        resolve: {
            modules: [path.join(__dirname, 'src'), 'node_modules'],
            extensions: ['.js', '.jsx', '.json'],
            alias: {
                src: path.resolve(__dirname, './src')
            }
        },

        module: {
            rules: [
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /(\.scss|\.css|\.sass)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.jpg$/,
                    use: ['url-loader?limit=10000&mimetype=image/jpg']
                },
                {
                    test: /\.png$/,
                    use: ['url-loader?limit=10000&mimetype=image/png']
                },
                {
                    test: /\.gif$/,
                    use: ['url-loader?limit=10000&mimetype=image/gif']
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: ['file-loader']
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader'
                        }
                    ]
                }
            ]
        }
    };
};
