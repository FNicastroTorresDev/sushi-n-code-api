export const getAllUsers = async (req, res) => {
  return res.status(201).send({
    message: 'Retornados los usuarios.'
  })
}

export const getOneUser = async (req, res) => {
  return res.status(201).send({
    message: 'Retornado un usuario.'
  })
}

export const createOneUser = async (req, res) => {
  return res.status(201).send({
    message: 'Creado un usuario.'
  })
}

export const updateOneUser = async (req, res) => {
  return res.status(201).send({
    message: 'Actualizado un usuario.'
  })
}

export const deleteOneUser = async (req, res) => {
  return res.status(201).send({
    message: 'Eliminado un usuario.'
  })
}