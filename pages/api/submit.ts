// pages/api/submit.ts
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY, // .env.local に保存！
});

const databaseId = process.env.NOTION_DATABASE_ID; // 同様に.env.localに！

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, affiliation, email, lineId } = req.body;

  try {
    await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            名前: { title: [{ text: { content: name } }] },
            所属: { rich_text: [{ text: { content: affiliation } }] },
            email: { email: email },
            lineID: { rich_text: [{ text: { content: lineId || "なし" } }] },
        },
    });

    res.status(200).json({ message: "Notionに保存完了" });
  } catch (error) {
    console.error("Notion API Error:", error);
    res.status(500).json({ error: "保存失敗" });
  }
}
