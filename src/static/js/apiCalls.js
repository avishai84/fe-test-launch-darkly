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

const getUpdateFromAPI = async (path, abortController) => {
    let lastData = null;
    let attemptsTimes = 0;
    const pollInterval = 5000;
    const maxAttemptsTimes = 4;

    // Call the API service
    let intervalID = setInterval(async () => {
  
        try {
            const fetchData = await fetch(path, {signal: abortController.signal});
            const data = await fetchData.json();
            // check for new data
            if(JSON.stringify(lastData) === JSON.stringify(data)) {
                // no new data
                // add attemp
                attemptsTimes++;
                if(abortController.signal.aborted || attemptsTimes >= maxAttemptsTimes) {
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
            if (error.name === 'AbortError') {
                console.log('Fetch request was aborted');
            } else {
                console.error(error);
            }
        }
      }, pollInterval);

      return() => {
            clearInterval(intervalID);
            abortController.abort();
      };
}




