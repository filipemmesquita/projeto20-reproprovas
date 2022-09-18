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
// export async function figuringThisOut(){
//     return await prisma.tests.findMany({
//         select:{
//             id:true,
//             name:true,
//             pdfUrl:true,
//             category:{
//                 select:{
//                     id:true,
//                     name:true,
//                 }
//             },
//             teacherDiscipline:{
//                 select:{
//                     id:true,
//                     teacher:{
//                         select:{
//                             id:true,
//                             name:true,
//                         }
//                     },
//                     discipline:{
//                         select:{
//                             id:true,
//                             name:true,
//                             term:{
//                                 select:{
//                                     id:true,
//                                     number:true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     })
// }
/*
term={
    id,
    number,
    disciplines:[{
        id,
        name,
        termId
        teachersDisciplines:[{
            id,
            teacherId,
            disciplineId,
            discipline,
            tests:[{
                id,
                name,
                pdfUrl,
                categoryId,
                teacherDisciplineId
            }]
        }]
    }]
}
try1.terms
        select:{
            id:true,
            number:true,
            disciplines:{
                select:{
                    id:true,
                    name:true,
                    teachers:{
                        select:{
                            
                            id:true,
                            teacher:{
                                select:{
                                    id:true,
                                    name:true,
                                }
                            },
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
*/