import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import * as path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ status: "error", message: "Vui lòng nhập số điện thoại" });
    }

    try {
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
         console.warn("Chưa cấu hình SMTP credentials. Mô phỏng gửi request thành công.");
         // Chờ 1 giây giả lập thời gian gửi
         await new Promise(resolve => setTimeout(resolve, 1000));
         return res.json({ status: "ok", message: "Simulated success" });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.SMTP_TO || process.env.SMTP_USER,
        subject: 'Có yêu cầu gọi lại cấp tốc từ khách hàng!',
        text: `Bạn nhận được yêu cầu tư vấn. Khách hàng vừa cung cấp số điện thoại: ${phone}\n\nVui lòng hệ lại ngay lập tức.`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ status: "ok" });
    } catch (e: any) {
      console.error("Lỗi khi gửi mail:", e);
      res.status(500).json({ status: "error", message: e.message || "Có lỗi xảy ra" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
