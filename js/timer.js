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


    $('#idForm').submit(function(event){
      event.preventDefault();
          $.ajax({
              url: "http://estr.herokuapp.com/api/appointments/cor",
              method: "POST",
              data: { appointment: {
                name: $('#name').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                password_confirmation: $('#password_confirmation').val(),
                phone_number: $('#phone_number').val(),
                clinic_id: 3
              }}
            });

    });


  });
