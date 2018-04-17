const shouldReplace = require('./shouldReplace')

async function handlePullRequestChange (context) {
  if (!shouldReplace(context.payload.pull_request.body)) {
    return
  }
  return context.github.pullRequests.update({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    number: context.payload.pull_request.number
  })
}

module.exports = handlePullRequestChange
