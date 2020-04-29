let fs = require('fs');
let path = require('path');

let octokitGraphql = require('@octokit/graphql');
let { Octokit } = require('@octokit/rest');

let authToken = fs
  .readFileSync(
    path.join(process.env.HOME, 'Dropbox', 'Startup', 'baseball-cards.github-access-token'),
    'utf8'
  )
  .trim();

let octokit = new Octokit({
  auth: authToken,
});

let graphqlWithAuth = octokitGraphql.graphql.defaults({
  headers: {
    authorization: `token ${authToken}`,
  },
});

async function testQuery$() {
  let { repository } = await graphqlWithAuth(`
  {
    repository(owner: "expo", name: "universe") {
      issues(last: 3) {
        edges {
          node {
            title
          }
        }
      }
    }
  }
  `);
  return repository;
}

module.exports = {
  graphqlWithAuth,
  testQuery$,
  octokit,
};
