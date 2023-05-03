import { menuExists } from '../db/validations.js'
import Menu from '../model/Menu.js'

export const getAllMenues = async (req, res) => {
  const { limit = 10, from = 0 } = req.query

  try {
    const [ allMenues, total ] = await Promise.all([
      Menu.find()
        .limit(limit)
        .skip(from),
      Menu.count()
    ])
    return res.status(201).send({
      total: total,
      data: allMenues
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Error al obtener los menues.',
      error: error.message
    })
  }
}

export const getOneMenu = async (req, res) => {
  const { menuId } = req.params

  try {
    const foundMenu = await Menu.findById(menuId)
    if (foundMenu) {
      return res.status(201).send({
        menu: foundMenu
      })
    }
  } catch (err) {
    return res.status(500).send({
      message: 'Error al obtener el menú.',
      error: err.message
    })
  }

  return res.status(404).send({
    message: 'El menú no existe.'
  })
}

export const createOneMenu = async (req, res) => {
  const {
    name,
    state,
    imgUrl,
    price,
    details,
    category
  } = req.body

  if (
    !name ||
    !imgUrl ||
    !price
  ) { 
    return res.status(400).send({
      error: 'Faltan datos.'
    })
  }

  if (await menuExists(name)) {
    return res.status(400).send({
      error: 'El menú ya existe.'
    })
  }

  const menu = await Menu({
    name,
    imgUrl,
    state,
    price,
    details,
    category
  })

  try {
    await menu.save()
    return res.status(201).send({
      message: `Se creó menú ${name}.`,
      data: menu
    })
  } catch (error) {
    return res.status(500).send({
      error: 'Error al crear el menú.',
      fields: {
        name: error.errors?.name?.message,
        imgUrl: error.errors?.imgUrl?.message,
        price: error.errors?.price?.message
      }
    })
  }
}

export const updateOneMenu = async (req, res) => {
  const { params: { menuId }, body } = req

  if (
    !menuId ||
    Object.keys(body).length === 0
  ) {
    return res.status(400).send({
      message: 'Faltan datos. Body vacío y/o sin id en la solicitud.'
    })
  }

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId, 
      body, 
      { returnDocument: 'after' }
    )
    if (updatedMenu) {
      return res.status(201).send({
        message: 'Actualizado un menú.',
        data: updatedMenu
      })
    }
  } catch (error) {
    return res.status(404).send({
      message: 'El menú no existe.',
      error: error.message
    })
  }
}

export const deleteOneMenu = async (req, res) => {
  const { menuId } = req.params

  if (!menuId) {
    return res.status(400).send({
      message: 'Faltan datos.'
    })
  }

  try {
    const deletedMenu = await Menu.findByIdAndDelete(menuId)
    if (deletedMenu) {
      return res.status(201).send({
        message: 'Menú eliminado.',
        // data: deletedMenu
      })
    }
  } catch (error) {
    return res.status(404).send({
      message: 'El menú no existe.',
      error: error.message
    })
  }
}