/* Your Code Here */

const createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = arrOfArrs => {
    return arrOfArrs.map(arr => createEmployeeRecord(arr));
}

// const createTimeInEvent = dateStamp => {
//     const dateSections = dateStamp.split(" ");
//     const newEntry = {
//         type: "TimeIn",
//         hour: dateSections[1] / 100,
//         date: dateSections[0]
//     }
//     // debugger;
//     this.timeInEvents.push(newEntry);
//     return this;
// }

function createTimeInEvent(dateStamp) {
    const dateSections = dateStamp.split(" ");
    const newEntry = {
        type: "TimeIn",
        hour: parseInt(dateSections[1]),
        date: dateSections[0]
    }
    this.timeInEvents.push(newEntry);
    return this;
}

function createTimeOutEvent (dateStamp) {
    const dateSections = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateSections[1]),
        date: dateSections[0]
    });
    return this;
}

function hoursWorkedOnDate(dateStamp) {
    const timeIn = this.timeInEvents.find(entry => entry.date === dateStamp).hour / 100;
    const timeOut = this.timeOutEvents.find(entry => entry.date === dateStamp).hour / 100;
    return parseInt(timeOut, 10) - parseInt(timeIn, 10);
}

function wagesEarnedOnDate(dateTime) {
    return hoursWorkedOnDate.call(this, dateTime) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {

    const test = employees.reduce((memo, employee) => {
        return memo + allWagesFor.call(employee);
    }, 0)
    console.log(test);
    return test;
}
