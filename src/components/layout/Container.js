import Styles from '../layout/Container.module.css'

function Container(props) {
    return <div className={`${Styles.container} ${Styles[props.customClass]}`}>{props.children}</div>
}

export default Container