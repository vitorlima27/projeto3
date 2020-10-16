import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import CaronasMotoristas from '../componentes/caronasMotoristas/CaronasMotoristas'
import CaronasPassageiros from '../componentes/caronasPassageiros/caronasPassageiros'
import Inicio from '../componentes/inicio/Inicio'


export default props =>
<Switch>
    <Route exact path='/' component={Inicio}/>
    <Route exact path='/caronasMotoristas' component={CaronasMotoristas}/>
    <Route exact path='/play' component={CaronasPassageiros}/>
    <Redirect from = '*' to = '/'/>
</Switch>