import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(async ({ where }) => {
  return await db.note.findMany({ orderBy: { updatedAt: "desc" }, where, include: { user: true } })
})
