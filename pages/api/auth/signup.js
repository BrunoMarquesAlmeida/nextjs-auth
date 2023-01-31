import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res
        .status(422)
        .json({ message: "Password should be at least 7 characters" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({
      email: email,
    });

    if (existingUser) {
      res.status(422).json({ message: "user already exists" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
}
