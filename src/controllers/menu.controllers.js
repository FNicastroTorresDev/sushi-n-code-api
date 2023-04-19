export const getAllMenues = async (req, res) => {
  return res.status(201).send({
    message: 'Retornados los menús.'
  })
}

export const getOneMenu = async (req, res) => {
  return res.status(201).send({
    message: 'Retornado un menú.'
  })
}

export const createOneMenu = async (req, res) => {
  return res.status(201).send({
    message: 'Creado un menú.'
  })
}

export const updateOneMenu = async (req, res) => {
  return res.status(201).send({
    message: 'Actualizado un menú.'
  })
}

export const deleteOneMenu = async (req, res) => {
  return res.status(201).send({
    message: 'Eliminado un menú.'
  })
}