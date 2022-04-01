import { useEffect, useState } from 'react'
import * as C from './App.styles'
import logoImage from '../src/assets/devmemory_logo.png'
import restartIcon from './svgs/restart.svg'
import { InfoItem } from './components/InfoItem'
import { Button } from './components/Button'
import { GridItemType } from './types/GridItemType'
import { items } from './data/items'
import { GridItem } from './components/GridItem'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'

const App = () => {

  const [playing, setPlaying] = useState<boolean>(true)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) setTimeElapsed(timeElapsed + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])


  useEffect(() => resetAndCreateGrid(), [])

  useEffect(() => {
    if(shownCount === 2){
      let opened = gridItems.filter(item => item.shown === true)
      if(opened.length === 2){
        if(opened[0].item === opened[1].item){
          let tempGrid = [...gridItems]
          for(let i in tempGrid){
            if(tempGrid[i].shown){
              tempGrid[i].permanentShown = true
              tempGrid[i].shown = false
            }
          }

          setGridItems(tempGrid)
          setShownCount(0)

        }else{
          setTimeout(() => {
            let tempGrid = [...gridItems]
            for(let i in tempGrid){
              tempGrid[i].shown = false
            }

            setGridItems(tempGrid)
            setShownCount(0)

          }, 1000)
        }

        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItems])

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      setPlaying(false)
    }
  }, [moveCount, gridItems])

  const resetAndCreateGrid = () => {
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)


    let tempGrid: GridItemType[] = []
    for(let i = 0;i < (items.length * 2);i++){
      tempGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      })
    }

    for(let w = 0;w < 2; w++){
      for(let i = 0; i < items.length; i++){
        let pos = 1
        while(pos < 0 || tempGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        tempGrid[pos].item = i
      }
    }

    setGridItems(tempGrid)

    setPlaying(true)
  }

  const handleItemClick = (index: number) => {
    if(playing && index !== null && shownCount < 2){
      let tempGrid = [...gridItems]

      if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false){
        tempGrid[index].shown = true
        setShownCount(shownCount + 1)
      }

      setGridItems(tempGrid)
    }
  }

  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} alt="" width={200} />
          </C.LogoLink>
          <C.InfoArea>
            <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
            <InfoItem label="Movimentos" value={moveCount.toString()} />
          </C.InfoArea>
          <Button label="Reinicar" icon={restartIcon} onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App;