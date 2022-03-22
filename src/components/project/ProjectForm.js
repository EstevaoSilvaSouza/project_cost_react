import Styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'


import { useState, useEffect } from 'react'

function ProjectForm({ handleSubmit, text, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || [])

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }
        })
            .then(res => res.json())
            .then(dat => { setCategories(dat) })
            .catch(error => console.log(error))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)

    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })

    }
    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })



    }
    return (
        <form onSubmit={submit} className={Styles.form}>
            <Input
                text='Nome do projeto'
                type='text'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />

            <Input
                text='Orçamento do projeto'
                type='number'
                name='budget'
                placeholder='Insira o orçamento total'
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />

            <Select
                name='category_id'
                text='Selecione a categoria'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />

            <Submit text={text} />

        </form>
    )
}

export default ProjectForm