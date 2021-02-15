//Funtion to make sure the date fields are entered correctly and the CITY and COUNTRY fields are compconste.

const editDates = (today, deptDate, retDate) => {
  if (!deptDate || !retDate) {
    alert("You must enter a depart date AND a return date");
    return true;
  }

  if (retDate < deptDate) {
    alert("The Return Date cannot be before the Departure Date.");
    return true;
  }

  if (deptDate < today) {
    alert("The Departure Date cannot be in the past");
    return true;
  }

  if (
    !document.getElementById("city").value ||
    !document.getElementById("country").value
  ) {
    alert("City AND Country must contain a value");
    return true;
  }
};

//Function to calculate the number of days difference betweeen 2 dates.
const date_diff_indays = (date1, date2) => {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
};

//Function to create the countdown until the departure date and build the text to display.
const countdown = (departDate, returnDate) => {
  // Get Interval from LS and if one exists kill it
  var thisInterval = "";
  thisInterval = JSON.parse(localStorage.getItem("interval"));
  if (thisInterval != null) {
    clearInterval(thisInterval);
  }

  // the setInterval function creates the countdown
  const x = setInterval(function () {
    thisInterval = x;
    let dt2 = "";
    // const str = departDate.toString();
    if (departDate === 0) {
      dt2 = new Date(departDate);
    } else {
      const deptYear = departDate.slice(0, 4);
      const deptMonth = departDate.slice(5, 7) - 1;
      const deptDay = departDate.slice(8);
      dt2 = new Date(deptYear, deptMonth, deptDay, 23, 59, 59);
    }

    const countDownDate = dt2.getTime();
    const now = new Date().getTime();
    const timeLeft = countDownDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let daysLiteral = "days";
    if (days === 1) daysLiteral = "day";

    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    document.getElementById("countDown").innerHTML = `Your ${date_diff_indays(
      departDate,
      returnDate
    )} day trip starts in: ${days} ${daysLiteral}, ${hours} hours, ${minutes} minutes, and ${seconds} seconds!!!`;
    localStorage.setItem("interval", JSON.stringify(thisInterval));

    // If the count down is finished, clear the text
    if (timeLeft < 0) {
      clearInterval(x);
      document.getElementById("countDown").innerHTML = "";
    }
  }, 1000);
};
