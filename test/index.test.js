// Requiring probot allows us to mock out a robot instance
const {createRobot} = require('probot')
// Requiring our app
const app = require('..')

function fixture (name, path) {
  return {
    event: name,
    payload: require(path)
  }
}

describe('probot-pr-template', () => {
  let robot
  let github
  beforeEach(() => {
    // Here we create a robot instance
    robot = createRobot()
    // Here we initialize the app on the robot instance
    app(robot)
    // This is an easy way to mock out the GitHub API
    github = {
      pullRequests: {
        update: jest.fn().mockReturnValue(Promise.resolve({
          data: [{ 'id': 1 }]
        }))
      }
    }
    // Passes the mocked out GitHub API into out robot instance
    robot.auth = () => Promise.resolve(github)
  })

  describe('test events', () => {
    it('when pull requests are opened content is updated', async () => {
      const payload = fixture('pull_request', './fixtures/pull_request.opened')
      // Simulates delivery of a payload
      await robot.receive(payload)

      expect(github.pullRequests.update).toHaveBeenCalled()
    })
  })
})
