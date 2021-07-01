import { useForm } from "react-hook-form"
import { validateEmail } from "../../utils/helper";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import client from "../../api/client";

type Props = {
    onClose: () => void;
}

const useForgotPassword = ({ onClose }: Props) => {
    const { t } = useTranslation();
    const { register, handleSubmit } = useForm();

    const onSubmit = async ({ email }: { email: string }) => {
        if (validateEmail(email)) {
            try {
                const response = await client.post('/user/forgot-password', {
                    email
                });
                if (response?.data?.success === true) {
                    toast.success(t('forgotPassword.success'));
                    onClose();
                } else {
                    toast.error(t('error.unknownError'));
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || t('error.unknownError'));
            }
        } else {
            toast.error(t("error.invalidEmail"));
        }
    }

    return {
        register,
        onSubmit: handleSubmit(onSubmit)
    }

}

export { useForgotPassword }