// UI service
const rootTable = document.querySelector('.rootTable');
const studentAPI = document.querySelector('.studentAPI');
const exams = document.querySelector('#exams');
const students = document.querySelector('#students');
const mainContent = document.querySelector('.uiBody main');
const tableBody = document.querySelector('.uiBody .tableBody');

function isLoading(check){
    console.log("isLoading ",check);
    if(check){
        document.querySelector('.uiBody main').classList.add('loading');
    }else{
        document.querySelector('.uiBody main').classList.remove('loading');
    }
}

function populateDataExamUi(data){
    console.log("populateDataExamUi ", data)
    // convert data object to array
    //const dataArr = Object.values(data);
    data?.exams.forEach(item => {
        const percentage = item.average * 100; 

        const trElem = document.createElement('tr');
        const tdElem1 = document.createElement('td');
        const tdElem2 = document.createElement('td');
        const tdElem3 = document.createElement('td');
        tdElem1.textContent = item.id;
        tdElem2.textContent = item.studentCount;
        tdElem3.textContent = percentage.toFixed(2);
        tableBody.appendChild(trElem);
        trElem.appendChild(tdElem1);
        trElem.appendChild(tdElem2);
        trElem.appendChild(tdElem3);
       
    });
    // return(data?.exams.map((item) => { 
    //     const percentage = item.average * 100; 
    //     const htmlTR = `<tr>
    //     <td>${item.id}</td>
    //     <td>${item.studentCount}</td>
    //     <td>${percentage.toFixed(2)}</td>
    //     </tr>`;
    //     return tableBody.innerHTML += htmlTR;
    // }));
    
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

// const p = document.createElement('p');
// rootTable.querySelector('.uiBody').appendChild(p);
// p.innerHTML = "UI service loaded READY";


});

