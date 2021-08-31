import authNotes from "app/auth/middleware/authStudent"
import { Middleware, resolver } from "blitz"
import db from "db"

export const middleware: Middleware[] = [authNotes]

export default resolver.pipe(resolver.authorize(), async ({ where }) => {
  return await db.note.findFirst({ orderBy: { updatedAt: "desc" }, where, include: { user: true } })
})
