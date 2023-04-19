export const getAllOrders = async (req, res) => {
  return res.status(201).send({
    message: 'Retornadas las órdenes.'
  })
}

export const getOneOrder = async (req, res) => {
  return res.status(201).send({
    message: 'Retornada una orden.'
  })
}

export const createOneOrder = async (req, res) => {
  return res.status(201).send({
    message: 'Creada una orden.'
  })
}

export const updateOneOrder = async (req, res) => {
  return res.status(201).send({
    message: 'Actualizada una orden.'
  })
}

export const deleteOneOrder = async (req, res) => {
  return res.status(201).send({
    message: 'Eliminada una orden.'
  })
}