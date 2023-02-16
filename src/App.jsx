import PadGrey from "./components/PadGrey";
import PadLightGrey from "./components/PadLightGrey";
import { convertNumberToWord, formatSum, range } from "./utils";

import {
	RiDivideLine,
	RiCloseLine,
	RiAddLine,
	RiSubtractLine,
} from "react-icons/ri";

import { TbEqual } from "react-icons/tb";
import PadOrange from "./components/PadOrange";
import { useEffect, useState } from "react";

import UniqueStringGenerator from "unique-string-generator";
import { serviceAuthentication } from "./services/auth";

const operatorToIcon = {
	divide: RiDivideLine,
	multiply: RiCloseLine,
	substract: RiSubtractLine,
	add: RiAddLine,
};

const STORAGE_KEY = "auth";

function App() {
	const [displayedNum, setDisplayedNum] = useState("0");
	const [bufferNum, setBufferNum] = useState(0);
	const [selectedOp, setSelectedOp] = useState(null);
	const [operator, setOperator] = useState(null);
	const [wordingNumber, setWordingNumber] = useState(null);
	const [dataLogin, setDataLogin] = useState(null);

	const handlePressNumPad = (input) => {
		setDisplayedNum((curr) => {
			const inputStr = input.toString();

			if ((curr === "0" || !!selectedOp) && input !== ".")
				return inputStr;
			return curr + inputStr;
		});

		if (selectedOp) {
			setSelectedOp(null);
			setOperator(selectedOp);
		}
	};

	const handlePressOperator = (op) => {
		const result = calculate();
		setSelectedOp(op);
		setBufferNum(result ?? Number(displayedNum));
	};

	const calculate = () => {
		const rightNum = Number(displayedNum);
		let result;
		switch (operator) {
			case "divide":
				result = bufferNum / rightNum;
				break;
			case "multiply":
				result = bufferNum * rightNum;
				break;
			case "subtract":
				result = bufferNum - rightNum;
				break;
			case "add":
				result = bufferNum + rightNum;
				break;
			default:
				return;
		}

		setWordingNumber(convertNumberToWord(result));
		setDisplayedNum(result.toString());
		setBufferNum(result);
		setOperator(null);
		return result;
	};

	const clear = () => {
		setDisplayedNum("0");
		setBufferNum(0);
		setSelectedOp(null);
		setOperator(null);
		setWordingNumber(null);
	};

	const buildNumPads = (start, end) => {
		return range(start, end).map((num, i) => (
			<PadGrey key={i} onClick={() => handlePressNumPad(num)}>
				{num}
			</PadGrey>
		));
	};

	const buildOperatorPad = (operator, selected) => {
		const Icon = operatorToIcon[operator];
		return (
			<PadOrange
				selected={selected}
				onClick={() => handlePressOperator(operator)}
			>
				<Icon />
			</PadOrange>
		);
	};

	const handleLogout = async () => {
		// alert("Yakin, ingin logout ?");

		const { data } = await serviceAuthentication({
			...dataLogin,
			type: "logout",
		});

		localStorage.removeItem(STORAGE_KEY);
		setDataLogin(null);
	};

	const handleLogin = async () => {
		const auth = {
			isLogin: true,
			browserId: UniqueStringGenerator.UniqueString(),
			timestamp: Date.now(),
			type: "login",
		};
		setDataLogin({
			...dataLogin,
			...auth,
		});

		const { data } = await serviceAuthentication(auth);

		localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
	};

	useEffect(() => {
		setDataLogin(JSON.parse(localStorage.getItem(STORAGE_KEY)));
	}, []);

	return (
		<div className="App">
			<div className="bg-black grid place-content-center p-4 h-screen">
				{dataLogin ? (
					<div className="grid gap-y-8">
						<div className="text-white text-7xl text-end font-light">
							{formatSum(Number(displayedNum))}
							<div className="text-sm mt-4 font-medium">
								{wordingNumber}
							</div>
						</div>
						<div
							className="grid grid-cols-calculator
           auto-rows-calculator gap-3"
						>
							<PadLightGrey
								className="col-span-3"
								onClick={clear}
							>
								AC
							</PadLightGrey>

							{buildOperatorPad(
								"divide",
								selectedOp === "divide"
							)}

							{buildNumPads(7, 9)}
							{buildOperatorPad(
								"multiply",
								selectedOp === "multiply"
							)}

							{buildNumPads(4, 6)}
							{buildOperatorPad(
								"substract",
								selectedOp === "substract"
							)}

							{buildNumPads(1, 3)}
							{buildOperatorPad("add", selectedOp === "add")}

							<PadGrey
								className="col-span-2"
								onClick={() => handlePressNumPad(0)}
							>
								0
							</PadGrey>
							<PadGrey
								onClick={() => handlePressNumPad(".")}
								disabled={!!displayedNum.match(/\./)}
							>
								.
							</PadGrey>
							<PadOrange onClick={calculate}>
								<TbEqual />
							</PadOrange>
						</div>
						<div>
							<button
								onClick={handleLogout}
								className="text-white bg-red-500 w-full h-full py-3 rounded-full transition-colors hover:bg-red-800"
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<button
						className="text-white bg-green-500 py-5 px-16 text-lg font-medium rounded-lg transition-colors hover:bg-green-800"
						onClick={handleLogin}
					>
						login
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
