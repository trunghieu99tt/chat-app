import React from "react";

interface Props {}

const MyAccountFooter = (props: Props) => {
    return (
        <footer className="mt-3 flex justify-between w-1/2 mx-auto text-mGray1 mb-12">
            <p className="text-sm">Created by @rikikudo</p>
            <p className="text-sm">devChallenges.io</p>
        </footer>
    );
};

export default MyAccountFooter;
