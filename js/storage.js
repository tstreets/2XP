const storage = {
	get(keyname) {
		const rawData = localStorage[keyname];
		if (!rawData) return {};
		return JSON.parse(rawData);
	},
	set(keyname, value) {
		const oldRawData = localStorage[keyname];
		const oldData = !oldRawData ? {} : JSON.parse(oldRawData);
		const newData = { ...oldData, ...value };
		localStorage[keyname] = JSON.stringify(newData);
		return newData;
	},
};

export default storage;
