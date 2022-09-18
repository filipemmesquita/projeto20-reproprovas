import * as teachersRepository from '../repositories/teacherRepository'
import * as disciplineRepository from '../repositories/disciplineRepository'
import * as teachersDisciplinesRepository from '../repositories/teachersDisciplinesRepository'
import { TeachersDisciplinesData } from '../types/teachersDisciplinesTypes'



export async function processTechersDisciplines(id:number){
    //const teachersDisciplines:TeachersDisciplinesData|null= await teachersDisciplinesRepository.getById(id);
    //teacher id into teacher data
}
export async function findByTeacherIdAndDisciplineId(teacherId:number,disciplineId:number){
    
}