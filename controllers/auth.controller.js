const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET; 

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const nasabah = await prisma.nasabah.findUnique({ where: { email } });

        if (!nasabah) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, nasabah.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: nasabah.id, email: nasabah.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    login
};