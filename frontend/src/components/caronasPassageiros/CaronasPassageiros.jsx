import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const baseUrl = 'http://localhost:3001/caronasPassageiros'

const initialState = {
    caronasMotoristas:{nome: '', contato:'', destino:'', data:''},
    list:[]
}


const headerProps = {
    title: 'Cadastro de caronas:',
    subtitle: 'Pedidos de caronas por passageiros!'
}

export default class CaronasPassageiros extends Component{
    state = {...initialState}


    componentWillMount(){
        axios(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }
    clear(){
        this.setState({caronasPassageiros: initialState.caronasPassageiros})
    }

    save(){
        const caronasPassageiros = this.state.caronasPassageiros
        const method = caronasPassageiros.id ? 'put' : 'post'
        const url = caronasPassageiros.id ? `${baseUrl}/${caronasPassageiros.id}` : baseUrl
        axios[method](url, caronasPassageiros)
        .then(resp =>{
            const list = this.getUpdateList(resp.data)
            this.setState({caronasPassageiros: initialState.caronasPassageiros, list})
        })
        this.checarCaronas(caronasPassageiros);
    }

    
    getUpdateList(caronasPassageiros, add = true){
        const list = this.state.list.filter(u => u.id !== caronasPassageiros.id)
        if(add) list.unshift(caronasPassageiros)
        return list
    }

    updateField(event){
        const caronasPassageiros = {...this.state.caronasPassageiros}
        caronasPassageiros[event.target.name] = event.target.value
        this.setState({caronasPassageiros})
    }

    load(caronasPassageiros){
        this.setState({caronasPassageiros})
    }

    remove(caronasPassageiros){
        axios.delete(`${baseUrl}/${caronasPassageiros.id}`).then(
            resp => {
               const list = this.getUpdateList(caronasPassageiros,false)
               this.setState({list}) 
            }
        )
    }

    checarCaronas(caronasPassageiros){
        var listaCaronas = []
        var lista = [];
        axios('http://localhost:3001/caronasMotoristas').then(lista = this.res.data);
        lista.forEach(element => {
            if(element.destino === caronasPassageiros.destino && element.data === caronasPassageiros.data){
                listaCaronas.add(element);
            }
        });
        alert(`Segundo nosso banco de dados existe(m) esse(s) motorista(s) que 
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
                                value={this.state.caronasPassageiros.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do livro..."/>

                        </div>

                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>contato</label>
                            <input type="text" className="form-control"
                                name="contato"
                                value={this.state.caronasPassageiros.contato}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do contato..."/>

                        </div>

                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>destino</label>
                            <input type="text" className="form-control"
                                name="destino"
                                value={this.state.caronasPassageiros.destino}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do destino..."/>

                        </div>
                    </div>
                     
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>data</label>
                            <input type="text" className="form-control"
                                name="data"
                                value={this.state.caronasPassageiros.data}
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
        return this.state.list.map(caronasPassageiros => {
            return(
                <tr key={caronasPassageiros.id}>
                    <td>{caronasPassageiros.id}</td>
                    <td>{caronasPassageiros.nome}</td>
                    <td>{caronasPassageiros.contato}</td>
                    <td>{caronasPassageiros.destino}</td>
                    <td>{caronasPassageiros.data}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(caronasPassageiros)}>
                            <i className="fa fa-pencil"></i>

                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(caronasPassageiros)}>
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