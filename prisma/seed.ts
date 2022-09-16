import { prisma } from "../src/database";


async function main(){
    const terms=[
        {number:1},
        {number:2},
        {number:3},
        {number:4},
        {number:5},
        {number:6}
    ];
    const categories=[
        {name:"Projeto"},
        {name:"Prática"},
        {name:"Recuperação"}
    ];
    const teachers=[
        {name:"Diego Pinho"},
        {name:"Bruna Hamori"}
    ];
    const disciplines=[
        {name:'HTML e CSS',termId:1},
        {name:'JavaScript',termId:2},
        {name:'React',termId:3},
        {name:'Humildade',termId:1},
        {name:'Planejamento',termId:2},
        {name:'Autoconfiança',termId:3}
    ];
    const teachersDisciplines=[
        {teacherId:1,disciplineId:1},
        {teacherId:1,disciplineId:2},
        {teacherId:1,disciplineId:3},
        {teacherId:2,disciplineId:4},
        {teacherId:2,disciplineId:5},
        {teacherId:2,disciplineId:6}
    ]

    await prisma.teachersDisciplines.deleteMany({
        where:{
            OR:teachersDisciplines
        }
    });
    await prisma.disciplines.deleteMany({
        where:{
            OR:disciplines
        }
    });
    await prisma.teachers.deleteMany({
        where:{
            OR:teachers
        }
    });
    await prisma.categories.deleteMany({
        where:{
            OR:categories
        }
    });
    await prisma.terms.deleteMany({
        where:{
            OR:terms
        }
    });
    await prisma.terms.createMany({
        data:terms
    });
    await prisma.categories.createMany({
        data:categories
    });
    await prisma.teachers.createMany({
        data:teachers
    });
    await prisma.disciplines.createMany({
        data:disciplines
    });

    await prisma.teachersDisciplines.createMany({
        data:teachersDisciplines
    });

 

}

main()
    .catch(e=>{
        console.log(e);
        process.exit(1)
    })
    .finally(()=>{
        prisma.$disconnect();
    })
