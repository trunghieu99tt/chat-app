module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                mBlue1: "#2f80ed",
                mGray1: "#828282",
                mGray2: "#333333",
                mGray3: "#F2F2F2",
                mGray4: "#D3D3D3",
                mGray5: "#252329",
                mGray6: "#3C393F",
                mBlack1: "#120F13",
            },
            borderRadius: {
                mL: "12px",
                mXl: "24px",
            },
            borderWidth: {
                1: "1px",
            },
            gridTemplateColumns: {
                "2-4-6": "40% 60%",
                "2-2-8": "20% 80%",
            },
            fontSize: {
                xss: "13px",
            },
            width: {
                17: "4.5rem",
            },
            height: {
                17: "4.5rem",
            },
            minWidth: {
                5: "40rem",
            },
            boxShadow: {
                box1: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            },
            maxHeight: {
                "55p": "55%",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
