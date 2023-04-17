const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");
const multer = require("multer");
const CLIENT_ID =
  "134999284364-2q742ng8kjl7m9o3ef4bbmj4mic2lnfo.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const app = express(express.static(path.join(__dirname + "public/uploads")));
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage }).array('file', 100);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
let paths = []

app.post("/sendemail", (req, res) => {
  console.log("Ressui");
  upload(req, res, (err) => {
    if (err) {
      console.log("Eroor");
      return;
    } else {
      console.log(req.files)
      req.files.forEach((file) => {
        paths.push({
          filename: Date.now() + "file" + path.extname(file.originalname),

          path: file.path
        });
      })
      console.log(paths);
      sendEmail(paths)
        .then((result) => {
          console.log("Message sent:");
        })
        .catch((error) => {
          console.log("Error: %s");
        });
    }
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


async function sendEmail(paths) {
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
          "ya29.a0Ael9sCNJPJajoqqBWpU9L2oTBtAZdo_5GgySzyLDSXwCAAXO3X2xr0MiHKdG7s6KyVZhsHJeb6tDVaKUZX95NU5pdtGglqAEReoJYl5V5j2ePVt4iAdOAZoGyOkP8sO3ZxwfJ2HMe2t7HyJkoxNnWxbNhNxPaCgYKAa8SARISFQF4udJh9Dq28ELrU1-T7xr8Tt6gKw0163",
      },
    });
    const mailOptions = {
      from: "omarkayumba12345@gmail.com",
      to: "omarkayumba2017@gmail.com",
      subject: "Tu l'as fait deux fois mon grand",
      text: "Je suis un message envoyé depuis l'ordinateur d'Omari, via Une Api de Google",
      html: "<h1>Bonjour Omari, Tu viens de réussir à envoyer ton premier mail avec Google, felicitation mon gars</h1> <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'/>",
      attachments: paths
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
}


  // Normalement doit être ici
  // sendEmail()
  // .then((result) => {
  //   console.log("Message sent:");
  // })
  // .catch((error) => {
  //   console.log("Error: %s");
  // });
