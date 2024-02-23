const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main(){
    try {
        await database.category.createMany({
            data: [
                { name: "Информатика"},
                { name: "Музыка"},
                { name: "Фитнесс"},
                { name: "Фотограф"},
                { name: "Бухгалтерский учет"},
                { name: "Инженер"},

            ]
        })
        console.log("Успех");
    } catch (error) {
        console.log("Ошибка при заполнении категории базы данных.",error)
    } finally{
        await database.$disconnect();
    }
}

main();