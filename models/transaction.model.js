const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TRANSACTION = {
	getAllTrans: async () => {
		try {
			const result = await prisma.transaction.findMany();
			return result;
		} catch (err) {
			console.error(err.message);
			return err;
		}
	},

    createTrans: async (data) => {
        try{
            const result = await prisma.transaction.create({
                data: data
        });
            return result;
        }catch (err) {
            console.error(err.message);
            return err;
        }
    },

    updateTrans: async (id, data) => {
        try {
            const result = await prisma.transaction.update({
                where: { id: id },
                data: data
            });
            return result;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    deleteTrans: async (id) => {
        try {
            const result = await prisma.transaction.delete({
                where: {id: id},
            });
            return result;
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = TRANSACTION;