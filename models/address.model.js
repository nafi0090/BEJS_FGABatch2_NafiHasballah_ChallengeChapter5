const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ADDRESS = {
	getAllAddress: async () => {
		try {
			const result = await prisma.address.findMany();
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	},

    createAdd: async (data) => {
        try{
            const result = await prisma.address.create({
                data: data
        });
            return result;
        }catch (err) {
            console.error(err.message);
            return err;
        }
    },

    updateAdd: async (id, data) => {
        try {
            const result = await prisma.address.update({
                where: { id: id },
                data: data
            });
            return result;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    deleteAdd: async (id) => {
        try {
            const result = await prisma.address.delete({
                where: {id: id},
            });
            return result;
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = ADDRESS;