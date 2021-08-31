import { getSession, Middleware } from "blitz"
import { Prisma } from "db"
import { merge } from "lodash"

const authNotes: Middleware = async (req, res, next) => {
  const session = await getSession(req, res)

  const where: Prisma.NoteWhereInput = { user: { id: session.userId! } }
  req.body.params.where = merge(req.body.params.where, where)
  await next()
}

export default authNotes
