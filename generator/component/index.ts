const componentExists = require("../utils/componentExists.js");

module.exports = {
    description: "Add an unconnected component",
    prompts: [
        {
            type: "input",
            name: "name",
            message: "What should it be called?",
            default: "Button",
            validate: (value) => {
                if (/.+/.test(value)) {
                    const existed = componentExists(value);
                    if (existed)
                        return "A component or container with this name already exists";
                    return true;
                }
                return "The name is required";
            },
        },
    ],
    actions: (data) => {
        const actions = [
            {
                type: "add",
                path:
                    "../src/components/{{properCase name}}/{{properCase name}}.tsx",
                templateFile: "./component/index.ts.hbs",
                abortOnFail: true,
            },
            {
                type: "add",
                path:
                    "../src/components/{{properCase name}}/{{lowerCase name}}.module.css",
                abortOnFail: true,
            },
            {
                type: "add",
                path: "../src/components/{{properCase name}}/index.ts",
                templateFile: "./component/entry.ts.hbs",
                abortOnFail: true,
            },
        ];

        return actions;
    },
};
