async function handlePullRequestChange (context) {
  return context.github.pullRequests.update({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    number: context.payload.pull_request.number
  })
  return context.github.repos.createStatus(context.repo({
    sha: head.sha,
    state: state,
    description: description,
    context: 'probot/minimum-reviews'
  }))
}

module.exports = handlePullRequestChange
