import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return Response.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("Groq API error", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
