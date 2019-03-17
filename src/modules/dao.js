export const getOne = async (req, res, next) => {
  res
    .status(200)
    .json({ data: req.entityFromParam })
    .end()
}

export const getAll = model => async (req, res, next) => {
  const result = await model.findAll()

  if (!result) {
    return res.status(400).end()
  }
  res.status(200).json({ data: result })
}

export const findBy = model => async (req, res, next, param) => {
  let result = ''
  try {
    result = await model.findOneByName(param)
  } catch (error) {
    next('No such element')
  }

  if (!result) {
    return res.status(400).end()
  }

  req.entityFromParam = result

  next()
}

export const createDaoFor = (model, customMethods = {}) => {
  const defaults = {
    getOne,
    findAll: getAll(model),
    findBy: findBy(model)
  }

  return { ...defaults, ...customMethods }
}
