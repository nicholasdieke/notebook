import { Signup } from "app/auth/validations"
import { AuthorizationError, resolver, SecurePassword } from "blitz"
import db from "db"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ name, email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  try {
    const user = await db.user.create({
      data: { name, email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
      select: { id: true, name: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role, name: user.name! })
    return user
  } catch (error) {
    throw new AuthorizationError("Email already exists")
  }
})
