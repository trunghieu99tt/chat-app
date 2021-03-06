import React from "react";
import { useTranslation } from "react-i18next";

// talons
import { useEditMyAccount } from "./useEditMyAccount";
import { useRecoilValue } from "recoil";

// components
import Input from "../../../components/Input";
import Spinner from "../../../components/Spinner";

// layout
import MyAccountLayout from "../../../layout/MyAccount/MyAccount.layout";

// icons
import { AiOutlineLeft } from "react-icons/ai";

// images
import DefaultAvatar from "../../../static/images/default.png";

// states
import { fullNameSelector, userState } from "../../../states/user.state";

const EditMyAccount = () => {
    const user = useRecoilValue(userState);
    const fullName = useRecoilValue(fullNameSelector);

    const { t } = useTranslation();

    const {
        loading,
        register,
        userPhoto,

        goBack,
        onChangePhoto,
        handleSubmit,
    } = useEditMyAccount();

    return (
        <React.Fragment>
            {loading && <Spinner />}

            <section className="block p-4 sm:flex flex-col justify-center items-center mt-12 text-white">
                <button
                    className="w-1/2 text-left mb-6 flex gap-2 items-center text-white"
                    onClick={goBack}
                >
                    <AiOutlineLeft />
                    {t("button.back")}
                </button>
                <div className="px-4 pt-0 sm:px-12 sm:py-7 border-none border-mGray1 rounded-xl sm:w-full sm:mx-2 md:w-3/4 md:border-solid md:border-mGray1 md:border lg:w-1/2 ">
                    <h2 className="text-lg sm:text-4xl mb-2">
                        {t("account.changeInfo")}
                    </h2>
                    <div className="flex gap-7 mb-8 items-center">
                        <Input
                            name="photo"
                            type="file"
                            id="photo"
                            hidden
                            ref={register}
                            classes={{
                                root: {
                                    display: "none",
                                },
                            }}
                            onChange={onChangePhoto}
                        />
                        <figure>
                            <img
                                src={userPhoto.url || DefaultAvatar}
                                alt={fullName}
                                className="w-17 h-17 rounded-lg object-cover"
                            />
                        </figure>
                        <label
                            htmlFor="photo"
                            className="text-mGray1 text-xss uppercase cursor-pointer"
                        >
                            {t("label.changePhoto")}
                        </label>
                    </div>

                    {user?.isThirdParty === true && (
                        <div className="editMyAccount__inputGroup">
                            <label
                                htmlFor="username"
                                className="editMyAccount__inputLabel"
                            >
                                {t("label.username")}
                            </label>
                            <Input
                                name="username"
                                type="text"
                                ref={register}
                                placeholder="Enter your username..."
                                required
                            />
                        </div>
                    )}

                    <div className="editMyAccount__inputGroup">
                        <label
                            htmlFor="firstName"
                            className="editMyAccount__inputLabel"
                        >
                            {t("label.firstName")}
                        </label>
                        <Input
                            name="firstName"
                            type="text"
                            ref={register}
                            placeholder="Enter your first name..."
                            required
                            defaultValue={user?.firstName}
                        />
                    </div>

                    <div className="editMyAccount__inputGroup">
                        <label
                            htmlFor="lastName"
                            className="editMyAccount__inputLabel"
                        >
                            {t("label.lastName")}
                        </label>
                        <Input
                            name="lastName"
                            type="text"
                            ref={register}
                            placeholder="Enter your last name..."
                            required
                            defaultValue={user?.lastName}
                        />
                    </div>
                    <div className="editMyAccount__inputGroup">
                        <label
                            htmlFor="lastName"
                            className="editMyAccount__inputLabel"
                        >
                            {t("account.bio")}
                        </label>
                        <textarea
                            name="bio"
                            id="bio"
                            cols={30}
                            rows={5}
                            className="border rounded border-mGray1"
                            defaultValue={user?.bio}
                            ref={register}
                        ></textarea>
                    </div>
                    <div className="editMyAccount__inputGroup">
                        <label
                            htmlFor="phone"
                            className="editMyAccount__inputLabel"
                        >
                            {t("account.phone")}
                        </label>
                        <Input
                            name="phone"
                            type="text"
                            ref={register}
                            placeholder="Enter your phone..."
                            required
                            defaultValue={user?.phone}
                        />
                    </div>
                    <div className="editMyAccount__inputGroup">
                        <label
                            htmlFor="email"
                            className="editMyAccount__inputLabel"
                        >
                            {t("account.email")}
                        </label>
                        <Input
                            name="email"
                            type="email"
                            ref={register}
                            placeholder="Enter your email..."
                            required
                            defaultValue={user?.email}
                        />
                    </div>
                    <div className="editMyAccount__inputGroup">
                        <label
                            htmlFor="password"
                            className="editMyAccount__inputLabel"
                        >
                            {t("account.password")}
                        </label>
                        <Input
                            name="password"
                            type="password"
                            ref={register}
                            placeholder="Enter your password..."
                            required
                        />
                    </div>

                    <button
                        className="mt-8 bg-mBlue1 text-white px-6 py-2 rounded-lg"
                        onClick={handleSubmit}
                    >
                        {t("button.save")}
                    </button>
                </div>
            </section>
        </React.Fragment>
    );
};

export default MyAccountLayout(EditMyAccount);
