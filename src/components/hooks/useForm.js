import { useState, useEffect } from "react";
import * as yup from 'yup'; // for everythin

const useForm = (validationSchema, initialValues, onSubmit) => {
    const initialErrors = Object.keys(
        initialValues
        ).reduce((acc, key) => {
        return {...acc, [key]: ''}
    }, {});

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [changeValue, setChangeValue] = useState(""); // quiero saber que valor fue el que cambio

    const validateField = async (name, value) => {
        if (validationSchema && validationSchema.fields[name]) {
            let error = null;
            try {
                // aca hago la validacion solo del campo que cambio, no de todos los valores.
                await yup.reach(validationSchema, name).validate(value);
            } catch (err) {
                error = err.errors ? err.errors[0] : null;
            };
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: error
            }));

            // establezco el valor que cambio.
            setChangeValue(name)
        };
    };

    const handleTextChange = event => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))
        validateField(name, value);
    };

    const handleTextBlur = () => {
        if (formValid) {
            return;
        }
        validateAllValues();
    };

    const handleSubmit = event => {
        if (!formValid) {
            return;
        }
        event.preventDefault();
        setIsSubmitting(true);
    };

    const validateAllValues = () => {
        // valido todos los valores
        validationSchema.validate(values)
        .then(() => {
            // si los valores son validos entonces blanqueo el objeto de errores y establezco la propiedad formValid en true.
            const notErrors = {};
            Object.keys(values).forEach( key => notErrors[key] = "" );
            setErrors(notErrors);
            setFormValid(true);
        })
        .catch(function(err) {
            /**
             * No quiero que se muestre el error si el usuario no ha pisado ese input, para eso es esta linea.
             */
            if ( Object.keys(values).indexOf(err.path) <= Object.keys(values).indexOf(changeValue) ) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [err.path]: err.errors ? err.errors[0] : null
                }));
            };
            setFormValid(false);
        });
    }

    useEffect(() => {
        validateAllValues();

        if (isSubmitting) {
            onSubmit();
        }
    }, [values, changeValue, formValid, isSubmitting]);


    return {values, errors, handleTextChange, handleTextBlur, handleSubmit, formValid, isSubmitting, setIsSubmitting};
}

export default useForm;
