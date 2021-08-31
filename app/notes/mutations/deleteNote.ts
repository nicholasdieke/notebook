import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteNote = z.object({
  noteId: z.string(),
})

export default resolver.pipe(resolver.zod(DeleteNote), resolver.authorize(), async ({ noteId }) => {
  const currentUser = await db.user.findFirst()

  const note = await db.note.delete({
    where: { id: noteId },
  })
  return note
})
