import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async (props, ctx) => {
  const tags = await db.note.findMany({
    select: {
      tags: true,
    },
    distinct: ["tags"],
    orderBy: { tags: "asc" },
  })

  let tagsArr: string[] = []

  tags.map(({ tags }) =>
    tags.map((tag) => {
      if (tagsArr.indexOf(tag) === -1) tagsArr.push(tag)
    })
  )

  return tagsArr
})
