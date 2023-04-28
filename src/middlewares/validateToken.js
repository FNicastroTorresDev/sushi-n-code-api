import jwt from 'jsonwebtoken'

export const validateToken = async (req, res, next) => {
  const token = req.headers['accessToken']

  if (!token) {
    return res.status(401).json({
      message: 'Sin acceso a esta página.',
      token: '¿No tiene token? Vuelva cuando obtenga uno...'
    })
  }

  const signature = process.env.signature

  try {
    const data = jwt.verify(token, signature)
    console.log(data)
  } catch (error) {
    return res.status(401).json({
      message: 'Acceso denegado.',
      token: 'Hmmm, no lo sé, Rick. Este token parece falso...'
    })
  }
}