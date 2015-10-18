  var clock;
  var numPatients = 0;

function getNumPatients(){
   numPatients = $.ajax({
      url: "http://estr.herokuapp.com/api/appointments/num/3",
      method: "GET",
      success: function(res) {
        console.log("ajax get to local success");
        console.log(res);

        displayTimer(res);
      },
      done: function(res) {
        console.log("ajax get to local done");
        console.log(res);
      }
    });
}

function displayTimer(res){
  waitTime = res*2000;
  clock = $('.clock').FlipClock(waitTime, {
        clockFace: 'HourCounter',
        countdown: true,
        autoStart: true,
        showSeconds: false,
        callbacks: {
          start: function() {
            $('.message').html('The clock has started!');
          }
        }
    });

    $('.start').click(function(e) {

      clock.start();
    });
}

  $(document).ready(function() {
    numPatients = getNumPatients();
    console.log("Get num Patients is ", + numPatients);

    // this is the id of the form
    $("#idForm").submit(function() {

        var url = "http://estr.herokuapp.com/appointments"; // the script where you handle the form input.
        $.ajax({
               type: "POST",
               url: url,
               data: {
                 appointment: {
                   $("#idForm").serialize();
                 }
               } // serializes the form's elements.
               success: function(data)
               {
                   alert(data); // show response from the php script.
               }
             });

        return false; // avoid to execute the actual submit of the form.
    });


  });
