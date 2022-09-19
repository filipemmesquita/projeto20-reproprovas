import { prisma } from "../database";
import { CreateTestData,TestData } from "../types/testTypes";

export async function insert(testData:CreateTestData){
    return await prisma.tests.create({
        data:testData
    });
}

export async function getAllByDiscipline(){
    return await prisma.terms.findMany({
        select:{
            id:true,
            number:true,
            disciplines:{
                select:{
                    id:true,
                    name:true,
                    teachersDisciplines:{
                        select:{
                            id:true,
                            tests:{
                                select:{
                                    id:true,
                                    name:true,
                                    pdfUrl:true,
                                    category:{
                                        select:{
                                            id:true,
                                            name:true,
                                        }
                                    },
                                    teacherDiscipline:{
                                        select:{
                                            teacher:{
                                                select:{
                                                    id:true,
                                                    name:true,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    })
}
export async function getAllByTeacher(){
    return await prisma.teachers.findMany({
        select:{
            id:true,
            name:true,
            teachersDisciplines:{
                select:{
                    id:true,
                    disciplineId:true,
                    tests:{
                        select:{
                            id:true,
                            name:true,
                            pdfUrl:true,
                            category:{
                                select:{
                                    id:true,
                                    name:true,
                                }
                            },
                            teacherDiscipline:{
                                select:{
                                    discipline:{
                                        select:{
                                            id:true,
                                            name:true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}
