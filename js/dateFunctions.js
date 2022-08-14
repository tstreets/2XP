export function getNextExpenseDate(expenseDate, frequency) {
	const dateRef = new Date(expenseDate);
	dateRef.setDate(dateRef.getDate() + 1);
	const nextDate = new Date();
	if (frequency === 'Weekly') {
		nextDate.setDate(nextDate.getDate() - 6 + dateRef.getDay());
		if (nextDate.getTime() < Date.now())
			nextDate.setDate(nextDate.getDate() + 6);
	}
	if (frequency === 'Monthly') {
		nextDate.setDate(dateRef.getDate());
		if (nextDate.getTime() < Date.now())
			nextDate.setMonth(nextDate.getMonth() + 1);
	}
	if (frequency === 'Annually') {
		nextDate.setDate(dateRef.getDate());
		nextDate.setMonth(dateRef.getMonth());
		if (nextDate.getTime() < Date.now())
			nextDate.setFullYear(nextDate.getFullYear() + 1);
	}
	if (frequency === 'Semi-Annually') {
		nextDate.setDate(dateRef.getDate());
		nextDate.setMonth(dateRef.getMonth());
		if (nextDate.getTime() < Date.now())
			nextDate.setMonth(nextDate.getMonth() + 6);
	}

	const next = nextDate.getTime();
	return next;
}

export function getDatesFromRange(rangeValue) {
	let startDate = new Date();
	if (rangeValue === 'All Month') startDate.setDate(1);
	if (rangeValue === 'All Week')
		startDate.setDate(startDate.getDate() - startDate.getDay());

	let endDate = new Date();
	if (rangeValue.includes('Week'))
		endDate.setDate(endDate.getDate() + 6 - endDate.getDay());
	if (rangeValue.includes('Month')) {
		endDate.setMonth(endDate.getMonth() + 1);
		endDate.setDate(1);
		endDate.setDate(endDate.getDate() - 1);
	}

	const start = startDate.getTime();
	const end = endDate.getTime();

	return [start, end];
}
