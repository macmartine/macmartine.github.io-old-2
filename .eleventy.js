const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const markdownIt = require("markdown-it");

function getMd(link) {

  if(link.includes('http')) { return link }
  if(link.includes('kindle')) { return link }
  if(link.includes('img')) { return link }
  if(link.includes('newsletter')) { return link }
  if(link.includes('mailto')) { return link }

  console.log('link -> ', link)

  var f = fs.readFileSync('/home/macmartine/src/macmartine.com/' + link, 'utf8')
  // var f = fs.readFileSync('./src/macmartine.com/' + link, 'utf8')
  var content = fm(f)
  // var slug = "/atoms/" + slugify(content.attributes.title)

  var slug = ''
  if( content.attributes.permalink ) {
    slug = "/" + slugify(content.attributes.permalink)
  } else {
    slug = "/posts/" + slugify(content.attributes.title)
  }

  console.log('title: ', slug)

  return slug
}

var fs = require('fs')
  , fm = require('front-matter')
 
module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");

  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
	.use(require('markdown-it-replace-link'), {
			processHTML: false, // defaults to false for backwards compatibility
			replaceLink: function (link, env, token, htmlToken) {
        var p = getMd(link)
        return p
			}
	}))

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


