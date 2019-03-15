/*
 HOF that wraps around a controller with async/await code inside. Any error thrown will be catched and the information will be passed along to error handlers
*/
export const catchErrors = controller => {
  return (req, res, next) => controller(req, res, next).catch(next)
}

/*
    Not Found Error Handler
*/
export const notFound = (req, res, next) => {
  const err = new Error('404: Not Found')
  err.status = 404
  next(err)
}

/*
  DEVELOPMENT error handler
*/
export const devError = (err, req, res, next) => {
  res.status(err.status || 500)
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      // highlights the file with an error
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>'
    )
  }
  res.format({
    'application/json': () => res.json(errorDetails)
  })
}

/*
  PRODUCTION error handler: no stack traces leaked
*/
export const prodErrors = (err, req, res, next) => {
  res.status(err.status || 500).end()
}
