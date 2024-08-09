const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TRANSACTION_TYPE = {
	getAllTransType: async () => {
		try {
			const result = await prisma.transaction_type.findMany();
			return result;
		} catch (err) {
			console.error(err.message);
			return err;
		}
	},

    createTransType: async (data) => {
        try{
            const result = await prisma.transaction_type.create({
                data: data
        });
            return result;
        }catch (err) {
            console.error(err.message);
            return err;
        }
    },

    updateTransType: async (id, data) => {
        try {
            const result = await prisma.transaction_type.update({
                where: { id: id },
                data: data
            });
            return result;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    deleteTransType: async (id) => {
        try {
            const result = await prisma.transaction_type.delete({
                where: {id: id},
            });
            return result;
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = TRANSACTION_TYPE;