import Style from './Home.module.css'
import saving from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton'

function Home() {
    return (
        <section className={Style.home_container}>
            <h1>Bem vindo ao <span>Salves</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>

            <LinkButton to={"/newproject"} text={"Criar Projeto"} />

            <img src={saving} alt="img" />
        </section>
    )
}

export default Home