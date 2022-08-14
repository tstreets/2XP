import { getViews, renderExpenseCard } from './renderViews.js';
import { getNextExpenseDate, getDatesFromRange } from './dateFunctions.js';
import storage from './storage.js';

const ref = {
	range: document.querySelector('#range'),
	newExpenseForm: document.querySelector('#newExpenseForm'),
	rangeForm: document.querySelector('#rangeForm'),
	content: document.querySelector('#content'),
};

const data = {};

document.body.onload = function () {
	ref.rangeForm.onchange = submitRange;
	ref.newExpenseForm.onsubmit = submitNewExpense;
	data.rangeForm = getDataFromForm(ref.rangeForm);
	data.newExpenseForm = getDataFromForm(ref.newExpenseForm);
	data.expenses = storage.get('expenses');

	getViews(updatePage);
	updatePage();
};

function submitRange(e) {
	e.preventDefault();
	data.rangeForm = getDataFromForm(this);
	updatePage();
}

function submitNewExpense(e) {
	e.preventDefault();
	data.newExpenseForm = getDataFromForm(this);
	data.expenses.list = data.expenses.list ?? [];
	data.expenses.list.push(data.newExpenseForm);
	ref.newExpenseForm.reset();
	updatePage();
}

function getDataFromForm(formRef) {
	return Object.fromEntries(new FormData(formRef));
}

function updatePage() {
	storage.set('expenses', data.expenses);
	ref.content.innerHTML = '';
	if (data.expenses.list) {
		getDataWithNextDates();
	}
	const expenseListContent = document.createElement('ul');
	expenseListContent.classList.add('horizontal');
	const totalExpenses = data.included.reduce((acc, itm) => {
		const newExpenseCard = renderExpenseCard(itm);
		expenseListContent.innerHTML += newExpenseCard;
		return acc - -itm.amount;
	}, 0);
	const totalExpenseCard = renderExpenseCard({
		name: `<span style='font-size: 2rem'>Total</span>`,
		amount: totalExpenses,
		nextDate: Date.now(),
		class: 'row',
	});
	expenseListContent.innerHTML += totalExpenseCard;
	ref.content.appendChild(expenseListContent);
}

function getDataWithNextDates() {
	const [start, end] = getDatesFromRange(data.rangeForm.range);
	const { included, ...expenseObj } = data.expenses.list.reduce(
		(acc, itm) => {
			const retObj = { ...acc };
			retObj[itm.frequency] = retObj[itm.frequency] ?? [];
			const nextDate = getNextExpenseDate(itm.date, itm.frequency);
			const itmObj = { ...itm, nextDate };
			retObj[itm.frequency].push(itmObj);
			if (start < nextDate && end > nextDate) {
				retObj.included.push(itmObj);
			}
			return retObj;
		},
		{ included: [] }
	);
	data.included = included;
	data.expenseObj = expenseObj;
}
