module.exports = (robot) => {
  const handlePullRequest = require('./lib/pull-request-update')
  robot.on([
    'pull_request.opened'
  ], handlePullRequest)
}
