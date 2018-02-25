module.exports = {
    "globals": {
        "process": false,
        "global": false,
        "module": false,
        "test": true,
        "expect": true,
        "describe": true,
	"afterAll": true,
        "beforeAll": true,
        "beforeEach": true,
	"it": true
    },
    "env": {
        "browser": true,
        "amd": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0
    }
};
