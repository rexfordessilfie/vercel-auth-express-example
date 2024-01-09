import { getSession } from "@auth/express"
import {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express"
import { authConfig } from "../config/auth.config.js"

export async function authenticatedUser(
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) {
  const session = res.locals.session ?? (await getSession(req, authConfig))

  res.locals.session = session

  if (session) {
    return next()
  }

  res.status(400).json({ message: "Not Authenticated" })
}

export async function currentSession(
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) {
  const session = await getSession(req, authConfig)
  res.locals.session = session
  return next()
}
