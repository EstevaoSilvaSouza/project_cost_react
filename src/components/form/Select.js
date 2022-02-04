import Styles from './Select.module.css'

function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className={Styles.form_control}>
            <div>
                <label htmlFor={name}>{text}</label>
            </div>
            <select name={name}
                id={name}
                onChange={handleOnChange} value={value || ''}>
                <option>Selecione a opção</option>

                {options.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}

            </select>
        </div>
    )
}

export default Select