// API Service
const dataStorage = {
    allData: {},
    updateData: function(data){
        this.allData = data;
        this.notifyNewData();
    },
    notifyNewData: function(){
        // render UI
        console.log("NEW DATA ", this.allData);
        populateDataExamUi(this.allData);
    }
}

const updateUI = async (data) => {
    // Logic to update the UI with the new score data
    // get the data  and store it in a valiable

    const dataObject = await data;
    // when data is ready resolve loading state
   
    // make consistent data structure
    if(Array.isArray(data)){
        // student data
        return dataStorage.updateData({students: data});
    }else{
        // {exams:Array<data>}
        return dataStorage.updateData(data);
    }
    console.log("dataObject ",dataObject);
}

const getUpdateFromAPI = async (path) => {
    let lastData = null;
    let attemptsTimes = 0;
    const pollInterval = 5000;
    const maxAttemptsTimes = 4;

    // Call the API service
    let intervalID = setInterval(async () => {
        const fetchData = await fetch(path);
        try {
            const data = await fetchData.json();
            // check for new data
            if(JSON.stringify(lastData) === JSON.stringify(data)) {
                // no new data
                // add attemp
                attemptsTimes++;
                if(attemptsTimes >= maxAttemptsTimes) {
                    // if max attemps reached stop polling
                    clearInterval(intervalID);
                    console.log("Max attempts reached");
                }
            }else{
                attemptsTimes = 0;
                lastData = data;
                updateUI(data);
            }
           
        } catch (error) {
            console.error(error);
        }
      }, pollInterval);
}



// document.addEventListener('DOMContentLoaded', () => {

//     console.log("DOMContentLoaded ");
// });



