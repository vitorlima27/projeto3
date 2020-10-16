import './Footer.css'
import React from 'react'

export default props => 
    <footer className="footer">
        <span>
            Desenvolvido por
            <button onClick={() => alert('Equipe:\n João Vitor de Lima Matrícula: 385397 \n Disciplina:\n  Desenvolvimento de Software para Web')}><strong>Créditos</strong> </button>
        </span>
        
    </footer>