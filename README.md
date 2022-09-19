# <p align = "center"> Reproprovas </p>


##  :clipboard: Description

Reproprovas ís an API that receives Exams and categorizes them by teacher or discipline.

***

## :rocket: Routes

```yml
POST /users/new
    - Route to register a new user
    - headers: {}
    - body:{
        "nome": "Your Name",
        "email": "your@email.com",
        "senha": "yourPassword22"
    }
```
    
```yml 
POST /users/login
    - Route to log in as a registered user
    - headers: {}
    - body: {
        "email": "your@email.com",
        "senha": "yourPassword22"
    }
```
    
```yml 
POST /tests/new (authenticated)
    - Route to register a new exam as a logged in user. 
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name":"The Name of The Exam",
        "pdfUrl":"https://exam-pdf-url.com",
        "categoryId":2,     //must correspond to an existing category
        "teacherId":3,      //must correspond to an existing teacher
        "disciplineId":1    //must correspond to an existing discipline that is taught by the teacher with teacherId as an id
    }
```

```yml
GET /tests/bydiscipline (authenticated)
    - Route that lists all registered tests ordered by Term and then Discipline
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - The response will be in this Format:{
    "terms": [
    {
      "id": 1, //term id
      "number": 1,    //which term it is, in this case the first
      "disciplines": [
        {
          "id": 2,              //discipline id
          "name": "JavaScript",   //discipline name
          "category": [
            {
              "name": "Projeto",      //exam category name
              "tests": [
                {
                  "id": 337,                              //exam id
                  "name": "The Name of the Exam",         //exam name
                  "pdfUrl": "https://exam-pdf-url.com",   //url to exam pdf
                  "teacher": {                     
                    "id": 1,                              //id of the teacher that made the exam
                    "name": "Diego Pinho"                 //name of same teacher
                  }
                }
              ]
            },
        {
          "id": 1,
          "name": "HTML e CSS"  //if there are no exams resgistered for a certain discipline, object "category" does not exist.
        },
        {
          "id": 4,
          "name": "Humildade"
        }
      ]
    },
    {
      "id": 4,
      "number": 4,
      "disciplines": []       //if there are no disciplines in a term, disciplines does exist as an empty array
    }
  ]
}
``` 

```yml
GET /tests/byteacher (authenticated)
    - Route that lists all registered tests ordered by Teacher
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - The response will be in this Format:{
      "teachers": [
        {
          "id": 2,              //teacher id
          "name": "José Carlos",   //teacher name
          "category": [
            {
              "name": "Projeto",      //exam category name
              "tests": [
                {
                  "id": 337,                              //exam id
                  "name": "dolorem hic incidunt",         //exam name
                  "pdfUrl": "https://steel-leash.net",    //url to exam pdf
                  "discipline": {                     
                    "id": 1,                              //id of the exam's discipline
                    "name": "Diego Pinho"                 //name of the exam's discipline
                  }
                }
              ]
            },
        {
          "id": 1,
          "name": "Carmem Silva"  //if there are no exams resgistered for a certain teacher, object "category" does not exist.
        }
      ]
    }
``` 
***

## 🏁 Running the API

First, make a clone of this repository in your computer:

```
git clone https://github.com/filipemmesquita/projeto20-reproprovas.git
```
Then, inside the folder, run the following command to install dependencies.

```
npm install
```
After that, run the following command to prepare the database

```
npx prisma migrate deploy
```



Finaly, run the following command to start the server.
```
npm run start
```
