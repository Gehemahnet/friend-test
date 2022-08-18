const RegistrationDataField = ({required, customizationStyle, label, inputType, error, dirty, name, value, onChange, onBlur, help}) => {

    return (
        <>
            <label className="registration__form-label">
                {label} {(name !== "email" && name!=="telegram") && <span className="mandatory-symbol">*</span>}
            </label>
            {
                error && dirty
                    ?
                    <input
                        required={required}
                        className={customizationStyle? `auth__form-input _error _${customizationStyle}` : "auth__form-input _error"}
                        type={inputType}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    :
                    <input
                        required={required}
                        className={customizationStyle? `auth__form-input _${customizationStyle}` : "auth__form-input"}
                        type={inputType}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
            }
            {(dirty && error && name !=="password") &&
                <span className="auth__error">
                    {error}
                </span>
            }
            {help &&
                <span className="registration__form-help">
                    {help}
                </span>
            }
        </>
    )
}

export default RegistrationDataField