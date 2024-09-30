module.exports = {
  siteMetadata: {
    title: "Camden's Blog",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/blog/`,
      },
    },

    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "DrupalGraqhQL",
        // This is field under which it's accessible
        fieldName: "Drupal",
        // Url to query from
        
        url: 'https://csc496f24demo.tldr.dev/graphql',
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
  ],
  
};