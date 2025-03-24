import React from "react";
import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({ name: "", affiliation: "", email: "" });

  useEffect(() => {
    liff.init({ liffId: "2007110734-Ew9Pa1k1" }) 
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          liff.getProfile().then(p => setProfile(p));
        }
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        lineId: profile?.userId,
      }),
    });
    alert("ご登録ありがとうございました！");
    liff.closeWindow(); // LINEトークに戻る
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>GhoonaCamp 登録フォーム</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="名前" onChange={handleChange} required />
        <br />
        <input name="affiliation" placeholder="大学名 / 企業名" onChange={handleChange} required />
        <br />
        <input name="email" type="email" placeholder="メールアドレス" onChange={handleChange} required />
        <br />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}
