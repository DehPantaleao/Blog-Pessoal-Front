import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import './CadastroTema.css';


function CadastroTema() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // capitura os parametros enviados pela url 
    const [token, setToken] = useLocalStorage('token'); //captura o token cadastrado
    const [tema, setTema] = useState<Tema>({ //altera o status do tema conforme forem criados 
        id: 0,
        descricao: '' //o state se inicia vazil e vai aumentando conforme os cadastros 
    })

    useEffect(() => { //aqui vai monitorar se o usuario esta cadastrato 
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")

        }
    }, [token])

    useEffect(() => { // monitora o id... se tiver algum disponivel ele aciona o findById
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) { //aciona o busca id que contem no service e se conecta com a api e tenta localizar se já estiver cadastrado.
        buscaId(`/tema/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedTema(e: ChangeEvent<HTMLInputElement>) { //resposansavel por capturar oq foi adicionado no formulario e atribuilos ao settema

        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {  // ira atualizar temas ja cadastrados e cadastrar temas novos
        e.preventDefault()
        console.log("tema " + JSON.stringify(tema))

        if (id !== undefined) {
            console.log(tema)
            put(`/tema`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema atualizado com sucesso');
        } else {
            post(`/tema`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back()

    }

    function back() {
        navigate('/temas')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}> 
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;