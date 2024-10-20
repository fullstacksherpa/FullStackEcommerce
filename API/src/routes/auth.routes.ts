import { createUserSchema, loginSchema, usersTable } from "@src/db/usersSchema";
import { validateData } from "@src/middlewares/validationMiddleware";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "@src/db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);
    const [user] = await db.insert(usersTable).values(data).returning();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json("Something went wrong while registering");
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    // Compare the plain password with the hashed password from the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    //create a jwt token and send to user

    const token = jwt.sign({ userId: user.id, role: user.role }, "your-secret-top", {
      expiresIn: "30d",
    });
    res.status(200).json(token);
  } catch (error) {}
});

export default router;
