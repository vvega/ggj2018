class GlyphMessageGenerator {
	constructor() {
		this.idConstraints = [
			[1, 2],
			[2, 3],
			[4, 5]
		];

		this.baseMessageNumber = 2;
	}

	generateInitialGlyphMessages() {
		let msgArray = [];
		for(let i = 0; i < this.baseMessageNumber; i++) {
			msgArray.push(this.generateRandomGlyphMessage());
		}

		return msgArray;
	}

	generateRandomGlyphMessage() {
		return new GlyphMessage(0, 0, [new Glyph(0, 0, this._getRandomId(0)),
									   new Glyph(0, 0, this._getRandomId(1)),
									   new Glyph(0, 0, this._getRandomId(2))]);
	}

	_getRandomId(glyphPosition) {
		let randId = this.idConstraints[glyphPosition][Math.floor(Math.random()*this.idConstraints[glyphPosition].length)];
		return randId;
	}
}