import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Styles from './Project.module.css'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import { parse, v4 as uuidv4 } from 'uuid'


function Project() {

    const id = useParams('id')

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [msg, setMsg] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(dat => {
                if (!dat) {
                    return
                }
                setProject(dat)
            })
            .catch(erro => alert(erro))
    }, [id])

    function toglleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleProjectService() {
        setShowServiceForm(!showServiceForm)
    }

    function createService(project) {
        // ultimo serviço
        setMsg('')

        const lastService = project.services[project.services.length - 1]


        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newcost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newcost > parseFloat(project.budget)) {
            setMsg('Orçamento ultrapaçado verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newcost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then(dat => { console.log(dat) })
            .catch(erros => console.log(erros))


    }

    function editProject(project) {

        setMsg('')

        if (project.cost > project.budget) {
            setMsg('Falha ao editar o projeto!!!!')
            setType('error')
            setShowProjectForm(false)
            return false;

        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then((dat) => {
                setProject(dat);
                setShowProjectForm(false)
                setMsg('Projeto editado com sucesso!!')
                setType('sucess')
            })
            .catch(erro => console.log(erro));
    }

    return (
        <>
            {project.name ? (
                <div className={Styles.project_details}>
                    <Container customClass='columm'>
                        {msg && (<Message type={type} msg={msg} />)}
                        <div className={Styles.service_from_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={Styles.btn} onClick={toglleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={Styles.project_info}>
                                    <p>
                                        <span>Categorias:</span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Total Orçamento:</span>$: {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span>$: {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={Styles.project_info}>
                                    <ProjectForm handleSubmit={editProject} text='Editar' projectData={project} />
                                </div>
                            )}
                        </div>

                        <div className={Styles.service_from_container}>
                            <h2>Adicionar do projeto</h2>

                            <button className={Styles.btn} onClick={toggleProjectService}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={Styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm submitHandle={createService} btntext='Adicionar Serviço' projectData={project} />
                                )}
                            </div>
                        </div>
                        <h2>SERVIÇOS</h2>
                        <Container customClass="start">
                            <p>lISTA DE ITENS</p>
                        </Container>
                    </Container>
                </div>)
                : <Loading />}
        </>
    )
}



export default Project