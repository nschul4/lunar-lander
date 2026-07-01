export class ReadOut {
    private text: string = "";
    private textLength: number = 0;
    private numberOfCallsToGetText: number = 0;
    private cursor: boolean = true;

    public clear() {
        this.text = "";
        this.textLength = 0;
        this.numberOfCallsToGetText = 0;
    }

    public setText(text: string) {
        if (this.numberOfCallsToGetText >= this.textLength * 2) {
            this.text = text;
            this.textLength = text.length;
            this.numberOfCallsToGetText = 0;
        }
    }

    public getText(): string {
        this.numberOfCallsToGetText += 1;
        var textLen: number = this.text.length;
        var maxLen: number = Math.min(this.numberOfCallsToGetText, textLen);
        var result: string = this.text.substring(0, maxLen);

        if (this.numberOfCallsToGetText < textLen) {
            this.cursor = true;
        } else {
            if (this.numberOfCallsToGetText % 16 == 0) {
                if (this.cursor) {
                    this.cursor = false;
                } else {
                    this.cursor = true;
                }
            }
        }

        if (textLen != 0) {
            if (this.cursor) {
                result += '\u2588';
            }
        }

        return result;
    }
}
