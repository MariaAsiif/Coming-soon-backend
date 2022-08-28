/**
 * Controllers are exported for connecting them with routes
 */
 
module.exports = {
  user: require("./user.controller"),  
  jobCategories: require('./categories.controller'),
  jobs: require("./jobs.controller"),
  interviews: require('./interviews.controller'),
  zoommeetings: require('./zoommeeting.controller'),
  recruitments: require('./recruitments.controller'),
  employees: require('./employees.controller'),
  departments: require('./department.controller'),
  quotes: require('./quote.controller'),
  tickers: require('./ticker.controller'),
  feedbacks: require('./feedback.controller'),
  permissions: require('./permission.controller'),
  roles: require('./roles.controller'),
  verifications: require('./verification.controller')
};
