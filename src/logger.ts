export class Logger {

    private static index: number = 0;
    private static text: string[] = [];
    private static MAX_LINES: number = 24

    private static padNumber(number: number, size: number) {
        var s = String(number);
        while (s.length < (size || 2)) { s = "0" + s; }
        return s;
    }

    static log(message: string): void {
        if (this.text.length >= this.MAX_LINES) {
            this.text.splice(0, 1);
        }
        this.text.push(this.padNumber(this.index, 3) + ": " + message + "\n");
        this.index += 1;
    }

    static getLog(): string {
        return this.text.join("");
    }
}
