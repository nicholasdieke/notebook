import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateNote = z.object({
  title: z.string(),
  content: z.string(),
})

export default resolver.pipe(resolver.zod(CreateNote), async (input, ctx) => {
  const { title, content } = input
  const currentUser = await db.user.findFirst()

  const note = await db.note.create({
    data: {
      title,
      content,
      user: { connect: { id: currentUser?.id } },
    },
  })
  return note
})
