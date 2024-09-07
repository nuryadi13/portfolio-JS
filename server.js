const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Menyajikan file statis dari folder 'public'
app.use(express.static("public")); // Tambahkan baris ini

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yadinuryadi1240@gmail.com",
    pass: "bangyadi1212",
  },
});

// Endpoint untuk menerima form kontak
app.post("/send", (req, res) => {
  const {namaLengkap, email, pesan} = req.body;

  const mailOptions = {
    from: email,
    to: "yadinuryadi1220@gmail.com",
    subject: `Pesan dari ${namaLengkap}`,
    text: `Nama Lengkap: ${namaLengkap}\nEmail: ${email}\nPesan: ${pesan}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).send("Terjadi kesalahan saat mengirim email.");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Pesan Anda telah dikirim.");
    }
  });
});

// Rute untuk menangani permintaan GET ke root URL
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
