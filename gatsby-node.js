/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const _has = require("lodash/has") // forgot to add it in package.json

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allPosts: wpgraphql {
        posts(first: 9999) {
          edges {
            node {
              slug
            }
          }
        }
      }
      allTopics: wpgraphql {
        tags {
          edges {
            node {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const { data } = result
    const { allPosts, allTopics } = data
    allPosts.posts.edges.forEach(element => {
      
      createPage({
        path: `/${element.node.slug}/`,
        component: path.resolve(`./src/templates/Blog/Post/index.js`),
        context: {
          slug: element.node.slug,
        },
      })
    })
    allTopics.tags.edges.forEach(element => {
      createPage({
        path: `/topic/${element.node.slug}/`,
        component: path.resolve(`./src/templates/Topic/index.js`),
        context: {
          tag: element.node.slug,
        },
      })
    })
  })
}

// heldriga approach

/* const createBlogPostPages = async (actions, graphql) => {
  const { data } = await graphql(`
    query {
      wpcms {
        posts (first:9999) {
          edges {
            node {
              slug
            }
          }
        }
      }
    }
  `)
  data.wpcms.posts.edges.forEach(data => {
    if (_has(data, 'node.slug') && typeof data.node.slug === 'string' && data.node.slug.length > 0) {
      actions.createPage({
        path: `${data.node.slug}`,
        component: path.resolve(`./src/templates/Blog/Post/index.js`),
        context: {
          slug: data.node.slug
        }
      })
    }
  })
}

const createTopicListPages = async (actions, graphql) => {
  const { data } = await graphql`
    query {
      wpcms {
        tags {
          edges {
            node {
              id
              slug
              name
            }
          }
        }
      }
    }
  `
  console.log('[debug] createTopicListPages: data: ', data)
  data.wpcms.posts.edges.forEach(data => {
    if (_has(data, 'node.slug') && typeof data.node.slug === 'string' && data.node.slug.length > 0) {
      actions.createPage({
        path: `/topic/${data.node.slug}`,
        component: path.resolve(`./src/templates/Topic/index.js`),
        context: {
          tag: data.node.slug
        }
      })
    }
  })
}

exports.createPages = async ({ actions, graphql }) => {
  // Generate the Blog post pages
  await createBlogPostPages(actions, graphql)
  // Generate the Topic list pages
  await createTopicListPages(actions, graphql)
} */

//
