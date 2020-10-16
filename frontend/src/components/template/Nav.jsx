import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to ="/">
                Início
            </Link>

            <Link to ="/caronasMotoristas">
                Motoristas com caronas disponíveis
            </Link>

            <Link to ="/caronasPassageiros">
                Passageiros procurando carona
            </Link>
        </nav>
    </aside>