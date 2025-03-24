export default async function handler(req, res) {
    if (req.method === "POST") {
      const { name, affiliation, email, lineId } = req.body;
  
      console.log("受け取ったデータ：", { name, affiliation, email, lineId });
  
      // ここでDB保存・メール送信など
  
      res.status(200).json({ message: "OK" });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  