const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage }).array('file',100);
const app = express(express.static(path.join(__dirname + "public/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/sendemail", (req, res) => { 
    console.log("Ressui");
  upload(req, res, (err) => {
    if (err) {
      console.log("Eroor");
      return;
    } else {
        console.log(req.files)
    }
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const CLIENT_ID =
  "134999284364-3gco4tibv5qh7t7h2kcgi5ppc1hemsik.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
async function sendEmail() {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      //   host: "smtp.gmail.com",
      //   port: 587,
      //   secure: false,
      auth: {
        type: "OAuth2",
        user: "omarkayumba12345@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        accessToken:
          "ya29.a0Ael9sCPDc6TLuzPuASTKOG1slsQI-XFGvTdNtMBbZ6YcWTltWAtk8icg3mmbXgb1j3A7Od598wgfjV_UsQMt_XnDG8dcgMizLvviFhdLuqeX2ePdQWV5YthISkzoXc1wjzyTXogz5-eTjNI3wnXMkvTNjZ8tnBkaCgYKAQcSARISFQF4udJh-DBD6S5BJdAkKPLzWVM5NQ0166",
      },
    });
    const mailOptions = {
      from: "omarkayumba12345@gmail.com",
      to: "omarkayumba2017@gmail.com",
      subject: "Ceci est le début de quelque chose de très grande",
      text: "Je ne suis que l'ombre de ce que tu vois",
      html: "<h1>Bonjour Omari, Tu viens de réussir à envoyer ton premier mail avec Google, felicitation mon gars</h1> <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'/>",
      attachments: [
        {
          filename: "file.txt",
          content: "Lorem ipsum dolor set amet",
        },
      ],
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
}

sendEmail()
  .then((result) => {
    console.log("Message sent:");
  })
  .catch((error) => {
    console.log("Error: %s");
  });
