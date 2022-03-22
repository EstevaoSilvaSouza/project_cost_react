import Style from '../project/ProjectForm.module.css'
import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/Submit'

function ServiceForm({ submitHandle, btntext, projectData }) {

    const [service, setService] = useState([])

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        submitHandle(projectData)

    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={submit} className={Style.form}>
            <Input
                type='text'
                text='Nome do serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input
                type='number'
                text='Valor do serviço'
                name='cost'
                placeholder='Insira o valor do serviço'
                handleOnChange={handleChange}
            />
            <Input
                type='text'
                text='Descrição do serviço'
                name='descricao'
                placeholder='Insira descrição do serviço'
                handleOnChange={handleChange}
            />
            <SubmitButton text={btntext} />
        </form>


    )

}

export default ServiceForm