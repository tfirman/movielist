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
  this.time = time;
  var price = 12;
  if (type === 'newRelease') {
    price += 3;
  } else if (type === 'secondRun') {
    price -= 3;
  }
  if (age < 13) {
    price -= 3;
    name += "  (with Youth discount)"
  } else if (age >= 65) {
    price -= 2;
    name += "  (with Senior discount)"
  }
  if (time === 'threep') {
    price -= 2;
    this.time = "3:00 PM"
  } else if (type === 'sixp') {
    this.time = "6:00 PM"
  } else {
    this.time = "9:00 PM"
  }
  this.price = price;
  this.name = name;
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
    $(".movieList").show();
    $("ul#movies").append("<li><span class='movieL'>" + "$" + newTicket.price + ": " + newTicket.time + " " + newTicket.name + "</span></li>");
    $("h4#totalCost").text("Total Cost: $" + parseInt(totalCost))
    $('input[type=checkbox]').each(function() {
      if (this.value === ('SW28' || 'threep')) {
        this.checked = true;
      } else {
        this.checked = false;
      };
    });
  });
});
