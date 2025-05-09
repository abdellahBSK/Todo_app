const deviceStorage = {
    saveKey(key, value) {
      try {
        localStorage.setItem(key, value);  // Correct method for saving to local storage
      } catch (error) {
        console.error("Error saving to local storage", error);
      }
    },
  
    retrieveKey(key) {
      try {
        const value = localStorage.getItem(key);  // Correct method for retrieving from local storage
        return value ? value : '';
      } catch (error) {
        console.error("Error retrieving from local storage", error);
        return '';
      }
    },
  
    destroyKey(key) {
      try {
        localStorage.removeItem(key);  // Correct method for removing from local storage
      } catch (error) {
        console.error("Error removing from local storage", error);
      }
    },
  };
  
  export default deviceStorage;
  