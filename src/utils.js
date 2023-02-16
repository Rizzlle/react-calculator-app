export function range(start, end) {
	const length = end + 1 - start;
	return Array.from({ length }, (_, i) => start + i);
}

export function formatSum(num) {
	const intl = new Intl.NumberFormat("en-US");
	return intl.format(num);
}

export function convertNumberToWord(number) {
	let word = "";
	const letter = [
		"",
		"satu",
		"dua",
		"tiga",
		"empat",
		"lima",
		"enam",
		"tujuh",
		"delapan",
		"sembilan",
	];
	const numberBelasan = [
		"sepuluh",
		"sebelas",
		"dua belas",
		"tiga belas",
		"empat belas",
		"lima belas",
		"enam belas",
		"tujuh belas",
		"delapan belas",
		"sembilan belas",
	];
	const puluhan = [
		"",
		"sepuluh",
		"dua puluh",
		"tiga puluh",
		"empat puluh",
		"lima puluh",
		"enam puluh",
		"tujuh puluh",
		"delapan puluh",
		"sembilan puluh",
	];

	if (number < 0 || number > 9999) {
		return "Angka harus di antara 0 dan 9999";
	}

	if (number === 0) {
		return "nol";
	}

	if (number < 10) {
		word = letter[number];
	} else if (number < 20) {
		word = numberBelasan[number - 10];
	} else if (number < 100) {
		word = puluhan[Math.floor(number / 10)];
		if (number % 10 !== 0) {
			word += " " + letter[number % 10];
		}
	} else if (number < 1000) {
		word = letter[Math.floor(number / 100)] + " ratus";
		if (number % 100 !== 0) {
			word += " " + convertNumberToWord(number % 100);
		}
	} else {
		word = convertNumberToWord(Math.floor(number / 1000)) + " ribu";
		if (number % 1000 !== 0) {
			word += " " + convertNumberToWord(number % 1000);
		}
	}

	return word;
}
