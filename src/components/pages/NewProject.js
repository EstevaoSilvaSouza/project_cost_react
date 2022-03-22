import Styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'
import { useNavigate } from 'react-router-dom'

function NewProject() {

    const history = useNavigate()

    function creatPost(project) {
        // initialize sales and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                history('/projects', { state: { message: 'projecto criado com sucesso' } })
            })

            //redirect
            .catch(err => console.error(err))
    }

    return (
        <div className={Styles.container_main}>
            <h1>Criar Projeto</h1>
            <p> Crie seu projeto para depois adicionar serviçõs</p>
            <p>Formulário</p>
            <ProjectForm text='Criar projeto'
                handleSubmit={creatPost} />
        </div>
    )
}

export default NewProject