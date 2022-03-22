import Message from '../layout/Message'
import { useLocation } from 'react-router-dom'
import Styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
    const location = useLocation()

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(dat => {
                setProjects(dat)
                setRemoveLoading(true)
            })
            .catch(erro => console.log(erro))

    }, [])



    function removeProjects(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(() => {
                setProjects(projects.filter(projetos => projetos.id !== id))
                setProjectMessage('Projeto removido com sucesso!!')
            })
            .catch(erro => console.log(erro))
    }




    let message = ''
    if (location.state) {
        message = location.state.message
    }

    return (
        <div className={Styles.project_container}>
            <div className={Styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text='Criar Projeto' />
            </div>
            {message && <Message msg={message} type='sucess' />}
            {projectMessage && <Message msg={projectMessage} type='sucess' />}
            <Container customClass="start">
                {projects.map(item => (
                    <ProjectCard
                        id={item.id}
                        name={item.name}
                        budget={item.budget}
                        category={item.category.name}
                        key={item.id}
                        handleRemove={removeProjects}

                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}



            </Container>
        </div>
    )

}

export default Projects