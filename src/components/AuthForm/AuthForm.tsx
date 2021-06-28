import React from "react";
import { Link } from "react-router-dom";

// talons
import { useAuth } from "../../talons/Auth/useAuth";

// utils
import mergeClasses from "../../utils/mergeClasses";
import Input from "../Input";
import Logo from "../Logo";

// components
import SocialLoginIcons from "../SocialLoginIcons/SocialLoginIcons";

// icons
import { BiUser, BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { MdLock } from "react-icons/md";

// styles
import defaultClasses from "./authform.module.css";
import EmailForm from "../EmailForm";

interface Props {
    classes?: object;
    isRegister?: boolean;
}

const AuthForm = ({ classes: propsClasses, isRegister = false }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        visibleEmailForm,
        handleSubmit,
        register,
        handleForgotPassword,
        onCloseEmailForm,
        onOpenEmailForm,
    } = useAuth({
        isRegister,
    });

    return (
        <React.Fragment>
            {visibleEmailForm && (
                <EmailForm
                    onSubmit={handleForgotPassword}
                    onClose={onCloseEmailForm}
                />
            )}
            <section className={classes.root}>
                <div className="max-w-lg rounded-mXl p-12 border-none md:border md:border-solid md:border-mGray1 bg-white">
                    <Logo />
                    <h4>Join thousands of learners from around the world </h4>
                    <p>
                        Master web development by making real-life projects.
                        There are multiple paths for you to choose
                    </p>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Input
                            name="username"
                            placeholder="Username"
                            icon={<BiUser />}
                            ref={register}
                            type="text"
                            required
                        />
                        <Input
                            name="password"
                            placeholder="Password"
                            icon={<MdLock />}
                            ref={register}
                            type="password"
                            required
                        />

                        {isRegister && (
                            <React.Fragment>
                                <Input
                                    name="passwordConfirm"
                                    placeholder="Password Confirm"
                                    icon={<MdLock />}
                                    ref={register}
                                    type="password"
                                    required
                                />
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    icon={<AiOutlineMail />}
                                    ref={register}
                                    type="email"
                                    required
                                />
                                <Input
                                    name="phone"
                                    placeholder="Phone"
                                    icon={<BiPhone />}
                                    ref={register}
                                    type="text"
                                    required
                                />
                                <Input
                                    name="firstName"
                                    placeholder="First Name"
                                    icon={<BiUser />}
                                    ref={register}
                                    type="text"
                                    required
                                />
                                <Input
                                    name="lastName"
                                    placeholder="Last Name"
                                    icon={<BiUser />}
                                    ref={register}
                                    type="text"
                                    required
                                />
                                <Input
                                    name="bio"
                                    placeholder="Bio"
                                    icon={<BiUser />}
                                    ref={register}
                                    type="text"
                                    required
                                />
                            </React.Fragment>
                        )}

                        <button
                            className="min-w-full bg-mBlue1 p-2 text-white font-semibold rounded-lg mb-8"
                            type="submit"
                        >
                            Start coding now
                        </button>
                    </form>

                    <p className="text-mGray1 text-center">
                        or continue with these social profile
                    </p>

                    <SocialLoginIcons />

                    {isRegister ? (
                        <p className="text-center text-mGray1 mt-5">
                            Already a member? <Link to="/login"></Link>
                        </p>
                    ) : (
                        <React.Fragment>
                            <p className="text-center text-mGray1 mt-5">
                                Doesn't have account?{" "}
                                <Link to="/signup">Register</Link>{" "}
                            </p>
                            <button
                                onClick={onOpenEmailForm}
                                className={classes.forgotPassword}
                            >
                                Forgot your password?
                            </button>
                        </React.Fragment>
                    )}
                </div>
            </section>
        </React.Fragment>
    );
};

export default AuthForm;
