import jwt from 'jsonwebtoken'

export const validateToken = async (req, res, next) => {
  const token = req.headers['accesstoken']

  if (!token) {
    return res.status(401).json({
      error: '¿No tiene token? Vuelva cuando obtenga uno...',
      message: 'Sin acceso a esta página.'
    })
  }

  const signature = process.env.SIGNATURE

  try {
    const data = jwt.verify(token, signature)
    // console.log(data)
  } catch (error) {
    return res.status(401).json({
      error: 'Hmmm, no lo sé, Rick. Parece falso...',
      message: 'Acceso denegado.'
    })
  }

  next()
}