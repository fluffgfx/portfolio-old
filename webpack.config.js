/* eslint-disable */

module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css?modules', 'sass']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.(jpg|png)$/,
        loaders: [
          'file?name=[path][name].[hash].[ext]',
         // 'resize-image?sizes[]=100w,sizes[]=200w,sizes[]=300w&blur=40',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.json/,
        exclude: /node_modules/,
        loader: 'json'
      }
    ]
  }
}