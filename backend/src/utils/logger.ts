type LogLevel = 'info' | 'error' | 'log';

// https://talyian.github.io/ansicolors/
const COLORS = {
    base: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    while: '\x1b[37m',
    bg_red: '\x1b[41m',
    bg_green: '\x1b[42m',
    bg_yellow: '\x1b[43m',
    bg_blue: '\x1b[44m',
    bg_magenta: '\x1b[45m',
    bg_cyan: '\x1b[46m',
    bg_white: '\x1b[47m',
};

let ERROR_COUNTER = 0;
let WARNING_COUNTER = 0;
let INFO_COUNTER = 0;

export class Logger {
    log(...optionalParams: any[]) {
        console.log(...optionalParams);
    }

    color(color: string, ...optionalParams: any[]) {
        console.log((COLORS as any)[color] || COLORS.base, ...optionalParams, COLORS.base);
    }
    info(...optionalParams: any[]) {
        const label = `${COLORS.cyan}[ INFO ][${INFO_COUNTER++}]${COLORS.base}`;
        console.log(label, ...optionalParams);
    }

    warring(...optionalParams: any[]) {
        const label = `${COLORS.yellow}[ WARNING ][${WARNING_COUNTER++}]${COLORS.base}`;
        console.log(label, ...optionalParams);
    }

    error(...optionalParams: any[]) {
        const label = `${COLORS.red}[ ERROR ][${ERROR_COUNTER++}]${COLORS.base}`;
        console.log(label, ...optionalParams);
    }
}

export const logger = new Logger();
