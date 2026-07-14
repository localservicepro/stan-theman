module.exports = function (eleventyConfig) {
  // Copy static files straight through, unchanged
  ["css", "js", "assets", "admin"].forEach((d) =>
    eleventyConfig.addPassthroughCopy("src/" + d)
  );
  ["robots.txt", "sitemap.xml", "site.webmanifest"].forEach((f) =>
    eleventyConfig.addPassthroughCopy("src/" + f)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
