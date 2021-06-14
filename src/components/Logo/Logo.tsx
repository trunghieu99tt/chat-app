import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/user.state";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./Logo.module.css";

interface Props {
    classes?: object;
}

const Logo = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);
    const user = useRecoilValue(userState);

    return (
        <figure className={classes.root}>
            <Link to={user ? "/" : "/login"}>
                <img
                    src={
                        require("../../static/images/devchallenges.svg").default
                    }
                    alt="logo"
                    width={150}
                    height={50}
                    className={classes.img}
                />
            </Link>
        </figure>
        // <div className={classes.root}>SMA</div>
    );
};
export default Logo;
