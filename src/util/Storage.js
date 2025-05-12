
export default function Storage(action, value, main, secondary) {
    if (action === "set") {
        if (secondary) {
            let original = JSON.parse(localStorage.getItem(main));
            original[secondary] = value;
            console.log(original);
            localStorage.setItem(main, JSON.stringify(original));
        } else {
            localStorage.setItem(main, JSON.stringify(value));
        }
    } else if (action === "get") {
        if (localStorage.getItem(main)) {
            if (secondary) {
                return JSON.parse(localStorage.getItem(main))[secondary];
            } else {
                return JSON.parse(localStorage.getItem(main));
            }
        }
    } else if (action === "push") {
        if (secondary) {
            let original = JSON.parse(localStorage.getItem(main))[secondary];
            let pushed = original[secondary]
            pushed.push(value);
            localStorage.setItem(main, JSON.stringify(pushed))
        } else {
            let original = JSON.parse(localStorage.getItem(main));
            original.push(value);
            localStorage.setItem(main, JSON.stringify(original));
        }
    } else if (action === "delete") {
        if (secondary) {
            let original = JSON.parse(localStorage.getItem(main));
            delete original[secondary]
            localStorage.setItem(main, JSON.stringify(original));
        } else {
            localStorage.removeItem(main)
        }
    } else if (action === "createIfNeeded") {
        if (localStorage.getItem(main)) {
            if (secondary) {
                if (!Object.keys(JSON.parse(localStorage.getItem(main))).includes(secondary)) {
                    let original = JSON.parse(localStorage.getItem(main));
                    original[secondary] = value;
                    localStorage.setItem(main, JSON.stringify(original))
                }
            }
        } else {
            if (secondary) {
                localStorage.setItem(main, JSON.stringify({
                    [secondary]: value
                }))
            } else {
                localStorage.setItem(main, JSON.stringify(value))
            }
        }
    }
}