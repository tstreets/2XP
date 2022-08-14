const view = {
	expenseCard: '',
};

export function getViews(callback) {
	try {
		fetch('views/expenseCard.html')
			.then(r => r.text())
			.then(r => {
				view.expenseCard = r;
				if (callback) callback();
			});
	} catch (e) {}
}

export function renderExpenseCard(exp) {
	let newExpenseCard = view.expenseCard;
	newExpenseCard = newExpenseCard.replace('{name}', exp.name ?? 'Unknown');
	newExpenseCard = newExpenseCard.replace('{amount}', exp.amount ?? 0);
	newExpenseCard = newExpenseCard.replace(
		'{date}',
		new Date(exp.nextDate).toLocaleDateString()
	);
	newExpenseCard = newExpenseCard.replace('{class}', exp.class ?? '');
	newExpenseCard = newExpenseCard.replace('{frequency}', exp.frequency ?? '');
	return newExpenseCard;
}

export default view;
