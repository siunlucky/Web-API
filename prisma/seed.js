const db = require('../app/config/db')

const { hash } = require('bcrypt');

async function main() {
    console.log('SEEDING ROLE USER STARTED');

    await db.userRole.createMany({
        data: [
            {

                name: 'admin',
            },
            {
                name: 'customer',
            },
            {
                name: 'partner',
            }
        ],
        skipDuplicates: true,
    });

    console.log('SEEDING ROLE USER SUCCESS');

    console.log('SEEDING USER STARTED');
    
    const roleAdmin = await db.userRole.findFirst({
        where: {
            name: 'admin'
        }
    });

    await db.user.create({
        data: {
            firstName: 'Admin',
            email: 'admin@gmail.com',
            password: await hash('admin', 10),
            role_id: roleAdmin.id
        }
    })

    console.log('SEEDING USER SUCCESS');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });