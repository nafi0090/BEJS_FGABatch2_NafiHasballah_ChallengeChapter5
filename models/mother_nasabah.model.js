const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MOTHER_NASABAH = {
	getMotherNasabah: async () => {
		try {
			const result = await prisma.mother_nasabah.findMany();
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	},

    createMotherNasabah: async (data) => {
        try{
            const result = await prisma.mother_nasabah.create({
                data: data
        });
            return result;
        }catch (err) {
            console.error(err.message);
            return err;
        }
    },

    updateMotherNasabah: async (id, data) => {
        try {
            const result = await prisma.mother_nasabah.update({
                where: { id: id },
                data: data
            });
            return result;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    deleteMotherNasabah: async (id) => {
        try {
            const result = await prisma.mother_nasabah.delete({
                where: {id: id},
            });
            return result;
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = MOTHER_NASABAH;