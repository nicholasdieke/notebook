import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateNote = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
})

export default resolver.pipe(resolver.zod(UpdateNote), resolver.authorize(), async (input, ctx) => {
  const { id, title, content, tags } = input

  const note = await db.note.update({
    where: { id },
    data: {
      title: title.trim(),
      content: content.trim(),
      tags,
    },
  })
  return note
})
