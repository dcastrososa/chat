import { useState } from "react";
import useForm from "./../../components/hooks/useForm";
import * as yup from "yup";
import { UserDAO } from "./../../common/dao/UserDAO";

const initialValues = {
    email: "",
    password: ""
};

const validationSchema = yup.object().shape({
    email: yup.string().required("El email es requerido").email("El email debe ser valido"),
    password: yup.string().required("La contrasena es requerida"),
});

const styles = {
    container: {
        flexDirection: "column", 
        alignItems: "center", 
        marginTop: "10%"
    },
    itemForm: {
        width: "270px",
        marginBottom: "8px"
    },
    btnSend: {
        marginTop: "8px"
    },
}

export const useLoginLogic = props => {
    const [ error, setError ] = useState("");
    const [ redirect, setRedirect ] = useState(false);
    const { onAuthSuccess } = props;

    const login = async () => {

        try {
            const response = await UserDAO.login(values);

            onAuthSuccess(response.data.data);
            const setCookie = (name, value, path) => document.cookie = `${name}=${value};path=${path}`;
            setCookie("client", response.headers["client"], "./myapp");
            setCookie("access-token", response.headers["access-token"], "./myapp");
            setCookie("uid", response.headers["uid"], "./myapp");
            setCookie("iduser", response.data.data.id);
            setRedirect(true);
        } catch (err) {
            if (err.response.status === 401) {
                setError(err.response.data.errors.join(" "));
            } else {
                setError("Sorry, something went wrong.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const { 
        values, 
        errors, 
        handleTextChange, 
        handleTextBlur, 
        handleSubmit, 
        formValid, 
        isSubmitting, 
        setIsSubmitting } = useForm(validationSchema, initialValues, login);

    return { values, styles, errors, handleTextChange, handleTextBlur, handleSubmit, formValid, isSubmitting, error, redirect};
};