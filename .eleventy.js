const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");

  eleventyConfig.addFilter('published', function(collection) {
    const filtered = collection.filter(item => !item.data.draft)
    return filtered;
  });

  eleventyConfig.addFilter('drafts', function(collection) {
    const filtered = collection.filter(item => item.data.draft)
    return filtered;
  });

  eleventyConfig.on("eleventy.before", ({runMode}) => {
		let text = "Excluding";
		// Only show drafts in serve/watch modes
		if(runMode === "serve" || runMode === "watch") {
      console.log('serve')
			process.env.BUILD_DRAFTS = true;
			text = "Including";
		}
      console.log('serve end')
  })

  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
		files: './_site/assets/**/*.css'
	});

  const {
    DateTime
  } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("DD");
  });

  return {
    dir: { input: 'src', output: '_site' }
  };
};


