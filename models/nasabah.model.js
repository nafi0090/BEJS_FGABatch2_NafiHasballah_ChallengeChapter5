const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};


const NASABAH = {
	getAllNasabah: async () => {
		try {
			const result = await prisma.nasabah.findMany();
			return result;
		} catch (err) {
			console.error(err.message);
			return err;
		}
	},

    createNasabah: async (data) => {
        try {
            const hashedPassword = await hashPassword(data.password);
            const result = await prisma.nasabah.create({
            data: {
                nik : data.nik,
                name : data.name,
                place_of_birth : data.place_of_birth,
                religion : data.religion,
                birth : data.birth,
                gender : data.gender,
                email : data.email,
                phone : data.phone,
                password: hashedPassword
            },
            });
            return result;
        } catch (err) {
            console.error(err.message);
            return err;
        }
    },

    updateNasabah: async (id, data) => {
        try {
            const result = await prisma.nasabah.update({
                where: { id: id },
                data: data
            });
            return result;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    deleteNasabah: async (id) => {
        try {
            const result = await prisma.nasabah.delete({
                where: {id: id},
            });
            return result;
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = NASABAH;