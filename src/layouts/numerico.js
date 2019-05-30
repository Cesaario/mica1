module.exports = {

	"normal": {

		_meta: {
			"backspace": { func: "backspace", classes: "control featured"},
			"accept": { func: "accept", text: "Close", classes: "control featured"},
			"next": { func: "next", text: "Next", classes: "control featured"},
			"space": { key: " ", text: "___", classes: "control featured"},
			"zero": { key: "0", width: 130}
		},

		default: [
			"1 2 3",
			"4 5 6",
			"7 8 9",
			"{space} . {zero} {backspace}"
		]
	}

};