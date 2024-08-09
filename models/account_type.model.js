const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ACCOUNT_TYPE = {
	getAllAccType: async () => {
		try {
			const result = await prisma.account_type.findMany();
			return result;
		} catch (err) {
			console.error(err.message);
			return err;
		}
	},

    createAccType: async (data) => {
        try{
            const result = await prisma.account_type.create({
                data: data
        });
            return result;
        }catch (err) {
            console.error(err.message);
            return err;
        }
    },

    updateAccType: async (id, data) => {
        try {
            const result = await prisma.account_type.update({
                where: { id: id },
                data: data
            });
            return result;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    deleteAccType: async (id) => {
        try {
            const result = await prisma.account_type.delete({
                where: {id: id},
            });
            return result;
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = ACCOUNT_TYPE;