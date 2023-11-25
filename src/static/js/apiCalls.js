// API Service
const dataStorage = {
    allData: {},
    updateData: function(data){
        this.allData = {...data};
        this.notifyNewData();
    },
    notifyNewData: function(){
        // render UI
        populateDataExamUi(this.allData);
    }
}

const updateUI = async (data) => {
    // Logic to update the UI with the new score data
    // get the data  and store it in a valiable

    const dataObject = await data;
    // when data is ready resolve loading state
    // make consistent data structure
    if(Array.isArray(dataObject)){
        // student data
        return dataStorage.updateData({students: dataObject});
    }else{
        return dataStorage.updateData(dataObject);
    }
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




