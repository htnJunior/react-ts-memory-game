import * as C from './App.styles'
import logoImage from '../src/assets/devmemory_logo.png'
import restartIcon from './svgs/restart.svg'
import { InfoItem } from './components/InfoItem'
import { Button } from './components/Button'

const App = () => {

  const resetAndCreateGrid = () => {

  }

  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} alt="" width={200} />
          </C.LogoLink>
          <C.InfoArea>
            <InfoItem label="Tempo" value="00:00" />
            <InfoItem label="Movimentos" value="0" />
          </C.InfoArea>
          <Button label="Reinicar" icon={restartIcon} onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>

        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App;