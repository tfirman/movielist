//business logic
var starW28 = {
  name: "Star Wars XXVIII",
  mType: "newRelease",
  showTimes: ["3:00 PM", "6:00 PM", "9:00 PM"],
  showTimesIsM: [true, false, false]
};
var eFaYMF = {
  name: "Even Faster and Yet More Furious",
  mType: "standard",
  showTimes: ["3:30 PM", "6:30 PM", "9:30 PM"],
  showTimesIsM: [true, false, false]
};
var paP2EB = {
  name: "Pride and Prejudice II: Electric Boogaloo",
  mType: "secondRun",
  showTimes: ["4:00 PM", "7:00 PM"],
  showTimesIsM: [true, false]
};
var movieMenu = [starW28, eFaYMF, paP2EB];

function Ticket(nMovie,mTime,age) {
  this.time = movieMenu[nMovie].showTimes[mTime];
  var name = movieMenu[nMovie].name;
  var price = 12;
  if (movieMenu[nMovie].mType === 'newRelease') {
    price += 3;
  } else if (movieMenu[nMovie].mType === 'secondRun') {
    price -= 3;
  }
  if (age < 13) {
    price -= 3;
    name += "  (with Youth discount)";
  } else if (age >= 65) {
    price -= 2;
    name += "  (with Senior discount)";
  }
  if (movieMenu[nMovie].showTimesIsM[mTime]) price -= 2;
  this.price = price;
  this.name = name;
}

function newShowTimes (whichMovie){
  $("div#showTimes").empty();
  for (i= 0; i < movieMenu[whichMovie].showTimes.length; i++) {
    $("div#showTimes").append('            <div class="radio">');
    $("div#showTimes").append('              <label>');
    if (i===0){
      $("div#showTimes").append('                <input type="radio" name="time" value="'+ i + '" checked>');
    } else {
      $("div#showTimes").append('                <input type="radio" name="time" value="'+ i + '">');
    }
    $("div#showTimes").append('                ' + movieMenu[whichMovie].showTimes[i]);
    $("div#showTimes").append('              </label>');
    $("div#showTimes").append('            </div>');
  };
}

// user interface logic
$(document).ready(function() {
  var totalCost = 0;
  for (i= 0; i < movieMenu.length; i++) {
    $("div#movieMenu").append('            <div class="radio">');
    $("div#movieMenu").append('              <label>');
    if (i===0){
      $("div#movieMenu").append('                <input type="radio" name="movie" value="'+ i +'" checked>');
    } else {
      $("div#movieMenu").append('                <input type="radio" name="movie" value="'+ i +'">');
    }
    $("div#movieMenu").append('                ' + movieMenu[i].name);
    $("div#movieMenu").append('              </label>');
    $("div#movieMenu").append('            </div>');
  };
  newShowTimes (0);

  $("#movieMenu").click(function(event) {
    newShowTimes ($("input:radio[name=movie]:checked").val());
  });

  $("form#new-movie").submit(function(event) {
    event.preventDefault();

    var nMovie = $("input:radio[name=movie]:checked").val();
    var mTime = $("input:radio[name=time]:checked").val();
    var inAge = $("input#age").val();
    var newTicket = new Ticket(nMovie,mTime,inAge);
    totalCost += newTicket.price;
    $(".movieList").show();
    $("ul#movies").append("<li><span class='movieL'>" + "$" + newTicket.price + ": " + newTicket.time + " " + newTicket.name + "</span></li>");
    $("h4#totalCost").text("Total Cost: $" + parseInt(totalCost))
    $('input[type=radio]').each(function() {
      if (this.value === '0') {
        this.checked = true;
      } else {
        this.checked = false;
      };
    });
  });
});
