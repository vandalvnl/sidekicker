import { toInt } from "../Utils";

interface ICut {
	text: string;
	delimiter?: string;
	fields?: string;
	chars?: number;
	string?: boolean;
}

const rangeRegex = /^[0-9]+-$/;
const multipleRegex = /^\d+(|,\d+)+$/;

const likeString = (array: string[], like: boolean, delimiter: string) => {
	if (like) {
		return array.join(delimiter);
	}
	return array;
};

export const cut = (cmd: ICut) => {
	if (cmd.delimiter && !cmd.fields) {
		return likeString(cmd.text.split(cmd.delimiter), cmd.string, cmd.delimiter);
	}
	if (cmd.delimiter && cmd.fields) {
		const textSplit = cmd.text.split(cmd.delimiter);
		const fieldArgs = cmd.fields.split("-");
		const total = textSplit.length;
		const first = toInt(fieldArgs[0]);
		if (rangeRegex.test(cmd.fields)) {
			return likeString(textSplit.splice(first - 1, total), cmd.string, cmd.delimiter);
		}
		if (multipleRegex.test(cmd.fields)) {
			const array: string[] = [];
			cmd.fields.split(",").forEach((x) => {
				const fieldNumber = toInt(x) - 1;
				try {
					array.push(textSplit[fieldNumber]);
				} catch (e) {}
			});
			return likeString(array, cmd.string, cmd.delimiter);
		}
		const second = toInt(fieldArgs[1]) || first;
		return likeString(textSplit.splice(first - 1, second), cmd.string, cmd.delimiter);
	}
};
