const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const serviceAccount = require('/etc/secrets/serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Asign default role based on email domain
app.post('/assign-default-role', async (req, res) => {
  const { uid, email } = req.body;

  const role = email.endsWith('@admin.com') ? 'admin' : 'user';

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    return res.send(`Role '${role}' assigned to user ${uid}`);
  } catch (err) {
    return res.status(500).send('Error: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
