import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { CodeGenerator } from "./util";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

const schema = z.object({
  output: z.string().min(1),
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/code", (c) => {
  return c.text("Send a POST request with a JSON body { output: string }");
});

app.post("/code", async (c) => {
  const body = await c.req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return c.json({ error: result.error });
  }
  const code = await CodeGenerator(result.data.output);
  return c.json({ code });
});

export default handle(app);
