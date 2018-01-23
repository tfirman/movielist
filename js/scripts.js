//business logic
function longName (mShort) {
  if (mShort === 'SW28') {
    return "Star Wars XXVIII";
  } else if (mShort === 'EFaYMF'){
    return "Even Faster and Yet More Furious";
  } else {
    return "Pride and Prejudice II: Electric Boogaloo";
  }
}
function movieType (mShort) {
  if (mShort === 'SW28') {
    return "newRelease";
  } else if (mShort === 'EFaYMF'){
    return "standard";
  } else {
    return "secondRun";
  }
}

function Ticket(name, type, age, time) {
  this.name = name;
  this.time = time;
  var price = 10;
  if (type === 'newRelease') {
    price += 3;
  } else if (type === 'secondRun') {
    price -= 3;
  }
  if (age <= 18) {
    price -= 2;
  } else if (age >= 65) {
    price -= 2;
  }
  if (time === 'threep') price -= 3;
  this.price = price;
}

// user interface logic
$(document).ready(function() {
  var totalCost = 0;
  $("form#new-movie").submit(function(event) {
    event.preventDefault();

    var mShort = $("input:radio[name=movie]:checked").val();
    var lName = longName (mShort);
    var mType = movieType (mShort);
    var age = $("input#age").val();
    var mTime = $("input:radio[name=time]:checked").val();
    var newTicket = new Ticket(lName,mType,age,mTime);
    totalCost += newTicket.price;
    alert (totalCost);
    $(".movieList").show();
    $("ul#movies").append("<li><span class='movieL'>" + newTicket.price + " " + newTicket.time + " " + newTicket.name + "</span></li>");

    $(".destination").last().click(function() {
      $("#show-destination").show();
      $("#show-destination h2").text(newDestination.name);
      $(".landmark").text(newDestination.landmark);
      $(".season").text(newDestination.season);
      $(".vNumbers").text(newDestination.number);
      $(".notes").text(newDestination.notes);
    });

    $("input#new-destination").val("");
    $("input#new-landmark").val("");
    $('input[type=checkbox]').each(function() {
      if (this.value === 'summer') {
        this.checked = true;
      } else {
        this.checked = false;
      };
    });
    $("input#vNumber").val("");
    $("input#notes").val("");
  });
});
