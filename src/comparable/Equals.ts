const props = Object.prototype.hasOwnProperty;

const isObject = (a: unknown, b: unknown) => a && b && typeof a === "object" && typeof b === "object";

const createInstanceOf = (a: unknown, b: unknown, instance: any) => {
	return [a instanceof instance, b instanceof instance];
};

// tslint:disable-next-line: cyclomatic-complexity
export function Equals(value: any, target: any) {
	if (value === target) {
		return true;
	}
	if (!isObject(value, target)) {
		return value !== value && target !== target;
	}
	const targetArr = Array.isArray(value);
	const valueArr = Array.isArray(target);
	let length;
	if (targetArr && valueArr) {
		length = value.length;
		if (length !== target.length) {
			return false;
		}
		for (let i = length; i-- !== 0; ) {
			if (!Equals(value[i], target[i])) {
				return false;
			}
		}
		return true;
	}
	if (targetArr !== valueArr) {
		return false;
	}
	const [valueDate, targetDate] = createInstanceOf(value, target, Date);
	if (valueDate !== targetDate) {
		return false;
	}
	if (valueDate && targetDate) {
		return value.getTime() === target.getTime();
	}
	const [regexValue, regexTarget] = createInstanceOf(value, target, RegExp);
	if (regexValue !== regexTarget) {
		return false;
	}
	if (regexValue && regexTarget) {
		return value.toString() === target.toString();
	}
	const objectKeys = Object.keys(value);
	length = objectKeys.length;
	if (length !== Object.keys(target).length) {
		return false;
	}
	for (let i = length; i-- !== 0; ) {
		if (!props.call(target, objectKeys[i])) {
			return false;
		}
	}
	for (let i = length; i-- !== 0; ) {
		if (!Equals(value[objectKeys[i]], target[objectKeys[i]])) {
			return false;
		}
	}
	return true;
}
