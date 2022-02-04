import Styles from './Input.module.css'

function Input({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={Styles.form_control}>
            <div>
                <label htmlFor={name}>{text}</label>
            </div>

            <div>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    id={name}
                    onChange={handleOnChange}
                    value={value}
                />
            </div>
        </div>
    )
}

export default Input