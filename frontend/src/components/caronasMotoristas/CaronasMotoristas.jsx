import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const baseUrl = 'http://localhost:3001/caronasMotoristas'

const initialState = {
    caronasMotoristas:{nome: '', contato:'', destino:'', data:''},
    list:[]
}


const headerProps = {
    title: 'Cadastro de caronas:',
    subtitle: 'Cadastro de caronas pelos motoristas!'
}

export default class caronasMotoristas extends Component{
    state = {...initialState}


    componentWillMount(){
        axios(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }
    clear(){
        this.setState({caronasMotoristas: initialState.caronasMotoristas})
    }

    save(){
        const caronasMotoristas = this.state.caronasMotoristas
        const method = caronasMotoristas.id ? 'put' : 'post'
        const url = caronasMotoristas.id ? `${baseUrl}/${caronasMotoristas.id}` : baseUrl
        axios[method](url, caronasMotoristas)
        .then(resp =>{
            const list = this.getUpdateList(resp.data)
            this.setState({caronasMotoristas: initialState.caronasMotoristas, list})
        })
        this.checarCaronas(caronasMotoristas);
    }

    
    getUpdateList(caronasMotoristas, add = true){
        const list = this.state.list.filter(u => u.id !== caronasMotoristas.id)
        if(add) list.unshift(caronasMotoristas)
        return list
    }

    updateField(event){
        const caronasMotoristas = {...this.state.caronasMotoristas}
        caronasMotoristas[event.target.name] = event.target.value
        this.setState({caronasMotoristas})
    }

    load(caronasMotoristas){
        this.setState({caronasMotoristas})
    }

    remove(caronasMotoristas){
        axios.delete(`${baseUrl}/${caronasMotoristas.id}`).then(
            resp => {
               const list = this.getUpdateList(caronasMotoristas,false)
               this.setState({list}) 
            }
        )
    }

    checarCaronas(caronasMotoristas){
        var listaCaronas = []
        var lista = [];
        axios('http://localhost:3001/caronasPassageiros').then(lista = this.res.data);
        lista.forEach(element => {
            if(element.destino === caronasMotoristas.destino && element.data === caronasMotoristas.data){
                listaCaronas.add(element);
            }
        });
        alert(`Segundo nosso banco de dados existe(m) esse(s) passageiros(s) que 
        tem o mesmo destino e data que você: \n` + listaCaronas);
    }


    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.caronasMotoristas.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do livro..."/>

                        </div>

                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>contato</label>
                            <input type="text" className="form-control"
                                name="contato"
                                value={this.state.caronasMotoristas.contato}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do contato..."/>

                        </div>

                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>destino</label>
                            <input type="text" className="form-control"
                                name="destino"
                                value={this.state.caronasMotoristas.destino}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do destino..."/>

                        </div>
                    </div>
                     
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>data</label>
                            <input type="text" className="form-control"
                                name="data"
                                value={this.state.caronasMotoristas.data}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a data..."/>

                        </div>
                    </div> 
                </div>
                <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary"
                                onClick={e => this.save(e)}>
                                Salvar
                            </button>

                            <button className="btn btn-secondary ml-2"
                                onClick={e => this.clear(e)}>
                                Cancelar
                            </button>

                        </div>
                    
                    </div>

            </div>
        )
    }
    renderRows(){
        return this.state.list.map(caronasMotoristas => {
            return(
                <tr key={caronasMotoristas.id}>
                    <td>{caronasMotoristas.id}</td>
                    <td>{caronasMotoristas.nome}</td>
                    <td>{caronasMotoristas.contato}</td>
                    <td>{caronasMotoristas.destino}</td>
                    <td>{caronasMotoristas.data}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(caronasMotoristas)}>
                            <i className="fa fa-pencil"></i>

                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(caronasMotoristas)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>

                </tr>
            )
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>contato</th>
                        <th>destino</th>
                        <th>data</th>
                    </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>

            </table>
        )
    }


    render(){
        return(
            
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
            
        )
    }
}