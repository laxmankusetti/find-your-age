document.getElementById('arrow').addEventListener('click', function() {
    const day = parseInt(document.getElementById('day').value)
    const month = parseInt(document.getElementById('month').value)
    const year = parseInt(document.getElementById('year').value)

    const currentDate = new Date()
    const inputDate = new Date(year, month-1, day)

    if(
        day < 1 || day > 31 ||
        month < 1 || month > 12 ||
        year < 1923 || year > 2023
    ) {
            displayInvalidError('Must be a valid input')
        }  else {
            displayAge(calculateAge(currentDate, inputDate))
        }
})

function calculateAge(currentDate, inputDate){
    const day = parseInt(document.getElementById('day').value)
    const month = parseInt(document.getElementById('month').value)
    const year = parseInt(document.getElementById('year').value)

    let age = {
        years: currentDate.getFullYear() - inputDate.getFullYear(),
        months: 0,
        days: 0
    }

    if(
        currentDate.getMonth() < inputDate.getMonth() ||
        currentDate.getMonth() === inputDate.getMonth() && currentDate.getDate() < inputDate.getDate()
    ) {
        age.years --
        age.months = 12 - inputDate.getMonth() + currentDate.getMonth()

        if (currentDate.getDate() < inputDate.getDate()){
            age.months --
            const lastMonth = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0)
            age.days = lastMonth.getDate() - inputDate.getDate() + currentDate.getDate()
        } else {
            age.days = currentDate.getDate() - inputDate.getDate()
        }
    } else if( !day || !month|| !year) {
        displayEmptyError('This field is required')
    }
    else{
        age.months = currentDate.getMonth() - inputDate.getMonth()
        if(currentDate.getDate() < inputDate.getDate()){
            age.months --
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
            age.days = lastMonth.getDate() - inputDate.getDate() + currentDate.getDate()
        } else{
            age.days = currentDate.getDate() - inputDate.getDate()
        }
    }

    return age
}

function displayAge(age) {
    const YearsValue = document.getElementById('years-value')
    const MonthsValue = document.getElementById('months-value')
    const DaysValue = document.getElementById('days-value')

    YearsValue.innerText = `${age.years}`
    MonthsValue.innerText = `${age.months}`
    DaysValue.innerText = `${age.days}`

    document.getElementById('error').innerText = ''
}

const emptyDay = document.getElementById('day-empty');
const invalidDay = document.getElementById('day-invalid');
const emptyMonth = document.getElementById('month-empty');
const invalidMonth = document.getElementById('month-invalid');
const emptyYear = document.getElementById('year-empty');
const invalidYear = document.getElementById('year-invalid');

function displayEmptyError(emptyMsg){
    document.getElementById('day').value === '' ? emptyDay.innerText = emptyMsg : emptyDay.innerText = ''
    document.getElementById('month').value === '' ? emptyMonth.innerText = emptyMsg : emptyMonth.innerText = ''
    document.getElementById('year').value === '' ? emptyYear.innerText = emptyMsg : emptyYear.innerText = ''
}

function displayInvalidError(invalidMsg){
    document.getElementById('day').value < 1 || document.getElementById('day').value > 31 ? invalidDay.innerText = invalidMsg : invalidDay.innerText = ''
    document.getElementById('month').value < 1 || document.getElementById('month').value > 12 ? invalidMonth.innerText = invalidMsg : invalidMonth.innerText = ''
    document.getElementById('year').value < 1900 || document.getElementById('year').value > 2023 ? invalidYear.innerText = invalidMsg : invalidYear.innerText = ''
}