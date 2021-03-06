import { Operator } from "Operator";
import { isAfter, isBefore, isSameOrAfter, isSameOrBefore, between } from "../dates/Date";
import { Equals } from "../comparable";

export const operators: Operator = {
	// tslint:disable-next-line:triple-equals
	"!=": (x: unknown, y: unknown) => x != y,
	"!==": (x: unknown, y: unknown) => x !== y,
	"<": (x: any, y: any) => x < y,
	"<=": (x: any, y: any) => x <= y,
	// tslint:disable-next-line:triple-equals
	"==": (x: unknown, y: unknown) => x == y,
	"===": (x: unknown, y: unknown) => x === y,
	equals: (x: unknown, y: unknown) => Equals(x, y),
	">": (x: any, y: any) => x > y,
	">=": (x: any, y: any) => x >= y,
	isAfter,
	isBefore,
	isSameOrAfter,
	isSameOrBefore,
	like: (x: string, y: string) => {
		return !!x.match(new RegExp(`.*${y}.*`, "gi"));
	},
	between: (value: string, values: any[]) => {
		const [mask, init, end] = values;
		return between(mask, init, end, value);
	},
};

export const executeByOperator = (x: unknown, operator: string, y: unknown) => operators[operator](x, y);

export default { executeByOperator, operators };
