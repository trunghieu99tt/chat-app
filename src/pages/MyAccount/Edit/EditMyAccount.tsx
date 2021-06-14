import React from "react";

// talons
import { useEditMyAccount } from "./useEditMyAccount";
import { useRecoilValue } from "recoil";

// components
import Input from "../../../components/Input";

// layout
import MyAccountLayout from "../../../layout/MyAccount/MyAccount.layout";

// icons
import { AiOutlineLeft } from "react-icons/ai";

// states
import { fullNameSelector, userState } from "../../../states/user.state";

const EditMyAccount = () => {
    const user = useRecoilValue(userState);
    const fullName = useRecoilValue(fullNameSelector);

    const { register, goBack, onChangePhoto, userPhoto, handleSubmit } =
        useEditMyAccount();

    return (
        <section className="flex flex-col justify-center items-center mt-12">
            <button
                className="w-1/2 text-left mb-6 flex gap-2 items-center text-mBlue1"
                onClick={goBack}
            >
                <AiOutlineLeft />
                Back
            </button>
            <div className="px-12 py-7 border-none border-mGray1 rounded-xl sm:w-full sm:mx-2 md:w-3/4 md:border-solid md:border-mGray1 md:border lg:w-1/2 ">
                <h2 className="text-4xl mb-2">Change info</h2>
                <h3 className="text-lg mb-12 font-light text-mGray1">
                    Changes will be reflected to every services
                </h3>

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
                            src={userPhoto.url}
                            alt={fullName}
                            className="w-17 h-17 rounded-lg object-cover"
                        />
                    </figure>
                    <label
                        htmlFor="photo"
                        className="text-mGray1 text-xss uppercase cursor-pointer"
                    >
                        Change photo
                    </label>
                </div>

                {user?.isThirdParty === true && (
                    <div className="editMyAccount__inputGroup">
                        <label
                            htmlFor="username"
                            className="editMyAccount__inputLabel"
                        >
                            Username
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
                        First Name
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
                        Last Name
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
                        Bio
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
                        Phone
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
                        Email
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
                        Password
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
                    Save
                </button>
            </div>
        </section>
    );
};

export default MyAccountLayout(EditMyAccount);
