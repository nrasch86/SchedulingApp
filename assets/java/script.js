// Waits for DOM to be fully loaded prior to executing function
document.addEventListener('DOMContentLoaded', function() {
    // Display current date
    var currentDayElement = document.getElementById('currentDay');
    if (currentDayElement) {
      currentDayElement.textContent = dayjs().format('dddd, MMMM D');
    }
  
    //load previously saved data entries
    var timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(function(block) {
      var savedData = localStorage.getItem(block.id);
      if (savedData !== null) {
        var textarea = block.querySelector('.description');
        textarea.value = savedData;
      }
    });
  
    //save data entries
    var saveButtons = document.querySelectorAll('.saveBtn');
    saveButtons.forEach(function(btn) {
      btn.addEventListener('click', function(event) {
        var timeBlock = event.target.closest('.time-block');
        if (!timeBlock) return;
        var textarea = timeBlock.querySelector('.description');
        localStorage.setItem(timeBlock.id, textarea.value);      
      });
    });
  
    // Function to update the color of time blocks
    function updateTimeBlockColors() {
      //Set current hour
      const currentHour = dayjs().hour();
  
      //Change block color based on current time
      document.querySelectorAll('.time-block').forEach((block) => {
        let blockHour = parseInt(block.id.split('-')[1], 10);
  
        //Update blockHour to 24-hour format
        let blockHour24 = blockHour < 9 ? blockHour + 12 : blockHour;
  
        // Remove previous time class
        block.classList.remove('past', 'present', 'future');
  
        // Add updated time class
        if (blockHour24 < currentHour) {
          block.classList.add('past');
        } else if (blockHour24 === currentHour) {
          block.classList.add('present');
        } else {
          block.classList.add('future');
        }
      });
    }
    // Update schedule colors
    updateTimeBlockColors();
  
    // Update schedule colors every minute
    setInterval(updateTimeBlockColors, 60000);
  });
  