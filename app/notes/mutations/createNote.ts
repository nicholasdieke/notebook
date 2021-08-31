import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateNote = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
})

export default resolver.pipe(resolver.zod(CreateNote), resolver.authorize(), async (input, ctx) => {
  const { title, content, tags } = input
  const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })

  const _note = await db.note.create({
    data: {
      title: title.trim(),
      content: content.trim(),
      tags,
      user: { connect: { id: ctx.session.userId! } },
    },
  })

  const note = { ..._note, user: user! }
  return note
})
