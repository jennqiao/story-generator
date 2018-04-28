const path = require('path');


module.exports = {
  entry: path.join(__dirname, '/client/src/Index.jsx'),
  output: {
    filename: 'bundle.js',
    // path: './client/public'
    path: path.join(__dirname, 'client/public')
  },
  module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: path.join(__dirname, "/client/src"),          
          loader: "babel-loader",
          options: {
              presets: ["es2015", "react"]
          }
      
        },
        {
          test: /\.css$/,
          include: path.join(__dirname, "/client/src"),
          use: [
            {
               loader: 'style-loader',
            },
            {
               loader: 'css-loader',
               options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[local]___[hash:base64:5]'
                 }
            }
            ],
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "images/.[hash].[ext]",
            },
          },
        }
        
      ]
  }
};