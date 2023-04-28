import Category from "../model/Category.js"
import { categoryExists } from "../db/validations.js"

export const getAllCategories = async (req, res) => {
  const { limit = 10, from = 0 } = req.query

  try {
    const [ allCategories, total ] = await Promise.all([
      Category.find()
        .limit(limit)
        .skip(from),
      Category.count()
    ])
    return res.status(201).send({
      total: total,
      data: allCategories
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Error al obtener las categorías.',
      error: error.message
    })
  }
}

export const getOneCategory = async (req, res) => {
  const { categoryId } = req.params

  try {
    const foundCategory = await Category.findById(categoryId)
    if (foundCategory) {
      return res.status(201).send({
        category: foundCategory
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Error al obtener la categoría.',
      error: error.message
    })
  }

  return res.status(404).send({
    message: 'La categoría no existe.'
  })
}

export const createOneCategory = async (req, res) => {
  const {
    name,
    state
  } = req.body

  if (!name) {
    return res.status(400).send({
      message: 'Falta un campo obligatorio.'
    })
  }

  if (await categoryExists(name)) {
    return res.status(400).send({
      message: 'La categoría ya existe.'
    })
  }

  const category = await Category({
    name,
    state
  })

  try {
    await category.save()
    return res.status(201).send({
      message: `Creada la categoria ${name}`
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Error al crear la categoría.',
      fields: {
        name: error.errors?.name?.message
      }
    })
  }
}

export const updateOneCategory = async (req, res) => {
  const { params: { categoryId }, body } = req

  if (
    !categoryId ||
    Object.keys(body).length === 0
  ) {
    return res.status(400).send({
      message: 'Faltan datos.'
    })
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      body,
      { returnDocument: 'after' }
    )
    if (updatedCategory) {
      return res.status(201).send({
        message: `Actualizada la categoría.`,
        data: updatedCategory
      })
    }
  } catch (error) {
    return res.status(404).send({
      message: 'La categoría no existe.',
      error: error.message
    })
  }
}

export const deleteOneCategory = async (req, res) => {
  const { categoryId } = req.params
  
  if (!categoryId) {
    return res.status(400).send({
      message: 'Solicitud sin id.'
    })
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId)
    if (deletedCategory) {
      return res.status(201).send({
        message: `Eliminada la categoría.`,
        data: deletedCategory
      })
    }
  } catch (error) {
    return res.status(404).send({
      message: 'La categoría no existe.',
      error: error.message
    })
  }
}