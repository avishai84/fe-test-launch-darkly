// UI service
const rootTable = document.querySelector('.rootTable');
const studentAPI = document.querySelector('.studentAPI');
const exams = document.querySelector('#exams');
const students = document.querySelector('#students');
const mainContent = document.querySelector('.uiBody main');
const tableBody = document.querySelector('.uiBody .tableBody');

function isLoading(check){

    if(check){
        document.querySelector('.loading').classList.remove('hide')
        document.querySelector('.loading').classList.add('show');
    }else{
        setTimeout(() => {
            document.querySelector('.loading').classList.remove('show')
            document.querySelector('.loading').classList.add('hide');
    }, 4000);
    }
}

function populateDataExamUi(data){
    //const dataArr = Object.values(data);
    const nameKeyObject = Object.keys(data);
    
    if(nameKeyObject[0] === 'students'){
        tableBody.innerHTML = '';
        data?.students.forEach(name => {
            const trElem = document.createElement('tr');
            const tdElem1 = document.createElement('td');
            tdElem1.textContent = name;
            tableBody.appendChild(trElem);
            trElem.appendChild(tdElem1);
        });
    }else{
        // exams
        // render table
        tableBody.innerHTML = '';
        data?.exams.forEach(item => {
            const percentage = item.average * 100; 
    
            const trElem = document.createElement('tr');
            const tdElem1 = document.createElement('td');
            const tdElem2 = document.createElement('td');
            const tdElem3 = document.createElement('td');
            tdElem1.textContent = item.id;
            tdElem2.textContent = percentage.toFixed(2) + '%';
            tdElem3.textContent = item.studentCount;
            tableBody.appendChild(trElem);
            trElem.appendChild(tdElem1);
            trElem.appendChild(tdElem2);
            trElem.appendChild(tdElem3);
                      
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    exams.addEventListener("click", async function(e) {
        // calling each API service separately
        isLoading(true);
    const examsAPICall = await getUpdateFromAPI('http://localhost:4000/api/v1/exams');
        isLoading(false);
    });

    students.addEventListener("click", async function(e) {
        // calling each API service separately
        isLoading(true);
    const studentsAPICall = await getUpdateFromAPI('http://localhost:4000/api/v1/students');
    isLoading(false);
    });

});

