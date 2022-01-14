module.exports = function (eleventyConfig) {
  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('./src/images/');
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/js/");
  eleventyConfig.addWatchTarget("./src/js/");

  //passthrough all favicon files
  /* eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('src/icon-192.png');
  eleventyConfig.addPassthroughCopy('src/icon-512.png');
  eleventyConfig.addPassthroughCopy('src/icon.svg');
  eleventyConfig.addPassthroughCopy('src/manifest.webmanifest'); */
  eleventyConfig.addPassthroughCopy({"./src/favicon": "/"});

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // open site in local brower when started
  eleventyConfig.setBrowserSyncConfig({
    open: true,
  });

  module.exports = function(eleventyConfig) {
    // Watch CSS files for changes
    eleventyConfig.setBrowserSyncConfig({
      files: './src/css/**/*.css'
    });
  };

  return {
    // able to use .html files instead of .njk
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    dir: {
      input: "src",
      output: "public",
    },
  };
};
