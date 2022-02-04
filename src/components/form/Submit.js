import Styles from './Submit.module.css'

function Submit({ text }) {
    return (
        <div>
            <button className={Styles.btn}>{text}</button>
        </div>
    )
}

export default Submit