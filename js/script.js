const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");
const inputs = document.querySelectorAll("input");
const outputDays = document.getElementById("output-days");
const outputMonths = document.getElementById("output-months");
const outputYears = document.getElementById("output-years");
const calculateBtn = document.getElementById("calculate-button");
const thirtyDayMonths = [4, 6, 8, 11];

function validateEmptyInput() {
	if (dayInput.value === "" || monthInput.value === "" || yearInput.value === "") {
		inputs.forEach((input) => {
			if (input.value === "") {
				input.classList.add("error");
				input.previousElementSibling.classList.add("error");
				input.nextElementSibling.innerHTML = "<i>This field is required</i>";
			} else {
				input.classList.remove("error");
				input.previousElementSibling.classList.remove("error");
				input.nextElementSibling.innerHTML = "";
			}
		});
		return false;
	} else {
		inputs.forEach((input) => {
			input.classList.remove("error");
			input.previousElementSibling.classList.remove("error");
			input.nextElementSibling.innerHTML = "";
		});
		return true;
	}
}

function validateYear(year, currentYear) {
	if (currentYear - year < 0) {
		yearInput.classList.add("error");
		yearInput.previousElementSibling.classList.add("error");
		yearInput.nextElementSibling.innerHTML = "<i>Must be in the past</i>";
		return false;
	} else {
		yearInput.classList.remove("error");
		yearInput.previousElementSibling.classList.remove("error");
		yearInput.nextElementSibling.innerHTML = "";
		return true;
	}
}

function validateMonth(month) {
	if (month < 1 || month > 12) {
		monthInput.classList.add("error");
		monthInput.previousElementSibling.classList.add("error");
		monthInput.nextElementSibling.innerHTML = "<i>Must be a valid month</i>";
		return false;
	} else {
		monthInput.classList.remove("error");
		monthInput.previousElementSibling.classList.remove("error");
		monthInput.nextElementSibling.innerHTML = "";
		return true;
	}
}

function validateDay(day, month, year, daysInMonth) {
	if (day < 1 || day > 31) {
		dayInput.classList.add("error");
		dayInput.previousElementSibling.classList.add("error");
		dayInput.nextElementSibling.innerHTML = "<i>Must be a valid day</i>";
		return false;
	}

	if (month !== 2 && day > daysInMonth[month]) {
		dayInput.classList.add("error");
		dayInput.previousElementSibling.classList.add("error");
		dayInput.nextElementSibling.innerHTML = `<i>${month} has only ${daysInMonth[month]} days</i>`;
		return false;
	}

	if (month === 2) {
		const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
		if (isLeapYear && day > 29) {
			dayInput.classList.add("error");
			dayInput.previousElementSibling.classList.add("error");
			dayInput.nextElementSibling.innerHTML = "<i>Must be a valid date</i>";
			return false;
		} else if (!isLeapYear && day > 28) {
			dayInput.classList.add("error");
			dayInput.previousElementSibling.classList.add("error");
			dayInput.nextElementSibling.innerHTML = "<i>Must be a valid date</i>";
			return false;
		}
	}

	dayInput.classList.remove("error");
	dayInput.previousElementSibling.classList.remove("error");
	dayInput.nextElementSibling.innerHTML = "";
	return true;
}

function validateDate(day, month, year) {
	const today = new Date();
	let [currentDay, currentMonth, currentYear] = [
		today.getDate(),
		today.getMonth(),
		today.getFullYear(),
	];
	const daysInMonth = {
		1: 31, // January
		2: 28, // February (base case, needs adjustment for leap year)
		3: 31, // March
		4: 30, // April
		5: 31, // May
		6: 30, // June
		7: 31, // July
		8: 31, // August
		9: 30, // September
		10: 31, // October
		11: 30, // November
		12: 31, // December
	};
	const isValidYear = validateYear(year, currentYear);
	if (!isValidYear) return;
	const isValidMonth = validateMonth(month);
	if (!isValidMonth) return;
	const isValidDay = validateDay(day, month, year, daysInMonth);
	if (!isValidDay) return;

	const userDate = new Date(year, month - 1, day);
	const timeDifference = today.getTime() - userDate.getTime();

	const millisecondsPerDay = 1000 * 60 * 60 * 24;
	const daysDifference = Math.floor(timeDifference / millisecondsPerDay);

	let yearsDifference = 0;
	let remainingDays = daysDifference;
	while (remainingDays >= 365) {
		if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
			remainingDays -= 366;
		} else {
			remainingDays -= 365;
		}
		yearsDifference++;
		year--;
	}

	const monthsDifference = Math.floor(remainingDays / 30);

	const remainingDaysAfterMonths = remainingDays % 30;

	if (userDate > today) {
		outputYears.innerText = "--";
		outputMonths.innerText = "--";
		outputDays.innerText = "--";
	} else {
		outputYears.innerText = yearsDifference;
		outputMonths.innerText = monthsDifference;
		outputDays.innerText = remainingDaysAfterMonths;
	}
}

function isValidDate(day, month, year) {
	const isEmpty = validateEmptyInput();
	if (!isEmpty) return;
	validateDate(day, month, year);
}

calculateBtn.addEventListener("click", () => {
	isValidDate(
		Number(dayInput.value),
		Number(monthInput.value),
		Number(yearInput.value)
	);
});
