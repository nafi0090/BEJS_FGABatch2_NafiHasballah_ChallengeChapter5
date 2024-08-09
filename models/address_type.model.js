const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ADDRESS_TYPE = {
	getAddressType: async () => {
		try {
			const result = await prisma.address_type.findMany();
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	},

    createAddType: async (data) => {
        try{
            const result = await prisma.address_type.create({
                data: data
        });
            return result;
        }catch (err) {
            console.error(err.message);
            return err;
        }
    },

    updateAddType: async (id, data) => {
        try {
            const result = await prisma.address_type.update({
                where: { id: id },
                data: data
            });
            return result;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },

    deleteAddType: async (id) => {
        try {
            const result = await prisma.address_type.delete({
                where: {id: id},
            });
            return result;
        } catch (err) {
            console.error(err.message);
        }
    }
};

module.exports = ADDRESS_TYPE;