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
  const idToken = req.body.idToken;

  try {
    const claims = await admin.auth().verifyIdToken(idToken);

    if (!claims.email) {
      return res.status(400).json({ status: 'error', message: 'El token no contiene un email válido' });
    }

    const role = claims.email.endsWith('@admin.com') ? 'admin' : 'user';

    await admin.auth().setCustomUserClaims(claims.sub, { role });

    return res.status(200).json({
      status: 'success',
      role: role,
      message: `Role ${role} assigned to user ${claims.sub}`
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
