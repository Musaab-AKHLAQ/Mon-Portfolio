const express = require("express");
const cors = require("cors");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

app.post("/contact", async (req, res) => {
  try {
    const { prenom, nom, email, message } = req.body;
    const emailParams = new EmailParams()

      .setFrom(new Sender("musaabakhlaq@gmail.com", "Formulaire TripAdvisor"))
      .setTo([new Recipient("musaabakhlaq@gmail.com", "Musaab")])
      .setSubject("Nouveau message du formulaire de contact").setHtml(`
       <h2>Nouveau message du formulaire de contact</h2>
       <p><strong>Prénom:</strong> ${prenom}</p>
       <p><strong>Nom:</strong>${nom}</p>
       <p><strong>Email:</strong>${email}</p>
       <p><strong>Message:</strong>${message}</p>`).setText(`
       Prénom: ${prenom}
       Nom: ${nom}
       Email: ${email}
       Message: ${message}`);

    await mailerSend.email.send(emailParams);
    res.json({ message: "Email envoyé avec succès ✅" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email ❌." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur est entrain de tourner sur http://localhost:${PORT}`);
});
