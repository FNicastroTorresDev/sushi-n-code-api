import { menuExists, userExists } from '../db/validations.js'
import Order from '../model/Order.js'

export const getAllOrders = async (req, res) => {
  const { limit = 10, from = 0 } = req.query

  try {
    const [ allOrders, total ] = await Promise.all([
      Order.find()
        .limit(limit)
        .skip(from),
      Order.count()
    ])
    return res.status(201).send({
      total: total,
      data: allOrders
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Error al obtener las órdenes.',
      error: error.message
    })
  }
}

export const getOneOrder = async (req, res) => {
  const { orderId } = req.params

  try {
    const foundOrder = await Order.findById(orderId)
    if (foundOrder) {
      return res.status(201).send({
        order: foundOrder
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Error al obtener la orden.',
      error: error.message
    })
  }

  return res.status(404).send({
    message: 'La orden no existe.'
  })
}

export const createOneOrder = async (req, res) => {
  const {
    user,
    menu,
    state
  } = req.body

  if (
    !user ||
    !menu
  ) {
    return res.status(400).send({
      message: 'Faltan datos.'
    })
  }

  const [ isUserExist, isMenuExist ] = await Promise.all([
    userExists(user),
    menuExists(menu)
  ])

  if (
    !isUserExist ||
    !isMenuExist
  ) {
    return res.status(400).send({
      message: 'El usuario y/o menú que no existen.'
    })
  }

  const order = await Order({
    user,
    date: new Date().toLocaleString(),
    menu,
    state
  })

  try {
    await order.save()
    return res.status(201).send({
      message: `La orden para ${user} fue creada.`,
      data: order
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Error al crear la orden.',
      fields: {
        user: error.errors?.user?.message,
        date: error.errors?.date?.message,
        menu: error.errors?.menu?.message
      }
    })
  }
}

export const updateOneOrder = async (req, res) => {
  const { params: { orderId }, body } = req

  if (
    !orderId ||
    Object.keys(body).length === 0
  ) {
    return res.status(400).send({
      message: 'Faltan datos. Body vacío y/o sin id en la solicitud.'
    })
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      body,
      { returnDocument: 'after' }
    )
    if (updatedOrder) {
      return res.status(201).send({
        message: 'Actualizada una orden.',
        data: updatedOrder
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Error al actualizar la orden.',
      error: error.message
    })
  }
}

export const deleteOneOrder = async (req, res) => {
  const { orderId } = req.params

  if (!orderId) {
    return res.status(400).send({
      message: 'Faltan datos.'
    })
  }

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId)
    if (deletedOrder) {
      return res.status(201).send({
        message: 'La orden fue eliminada.',
        data: deletedOrder
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: 'La orden no existe.',
      error: error.message
    })
  }
}