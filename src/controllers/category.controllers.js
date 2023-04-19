export const getAllCategories = async (req, res) => {
  return res.status(201).send({
    message: 'Retornadas las categorías.'
  })
}

export const getOneCategory = async (req, res) => {
  return res.status(201).send({
    message: 'Retornada una categoría.'
  })
}

export const createOneCategory = async (req, res) => {
  return res.status(201).send({
    message: 'Creada una categoría.'
  })
}

export const updateOneCategory = async (req, res) => {
  return res.status(201).send({
    message: 'Actualizada una categoría.'
  })
}

export const deleteOneCategory = async (req, res) => {
  return res.status(201).send({
    message: 'Eliminada una categoría.'
  })
}