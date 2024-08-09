const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ACCOUNT = {
	getAllAcc: async () => {
		try {
			const result = await prisma.account.findMany();
			return result;
		} catch (err) {
			console.error(err.message);
			return err;
		}
	},

    createAccount: async (data) => {
        try{
            const result = await prisma.account.create({
                data: data
        });
            return result;
        }catch (err) {
            console.error(err.message);
            return err;
        }
    },

    updateAccount: async (id, data) => {
        try {
            const result = await prisma.account.update({
                where: { id: id },
                data: data
            });
            return result;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    deleteAccount: async (id) => {
        try {
            const result = await prisma.account.delete({
                where: {id: id},
            });
            return result;
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = ACCOUNT;