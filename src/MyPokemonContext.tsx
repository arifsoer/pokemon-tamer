import React, { Dispatch, useEffect, useState, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";
import store from 'store'

const STORE_KEY = 'myPokemon'

interface myPokemonContextInterface {
  myPokemons: PokemonInterface[];
  addNewPokemon: (newPokemon: PokemonInterface) => void;
  removePokemon: (newPokemon: PokemonInterface) => void;
  showCatchModal?: Dispatch<SetStateAction<boolean>>;
}

export const MyPokemonContext = React.createContext<myPokemonContextInterface>({
  myPokemons: [],
  addNewPokemon: () => {},
  removePokemon: () => {}
})

export const MyPokemonComponent: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [myPokemons, setMyPokemon] = useState<PokemonInterface[]>([])
  const [catchModal, showCatchModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const addNewPokemon = (newPokemon: PokemonInterface) => {
    const find = myPokemons.findIndex(poke => poke.name === newPokemon.name)
    if (find <= -1) {
      myPokemons.push(newPokemon)
      store.set(STORE_KEY, myPokemons)
      setMyPokemon(myPokemons)
      setModalMessage('Success, lets catch other pokemon')
      showCatchModal(true)
    } else {
      setModalMessage('You Already catch this pokemon')
      showCatchModal(true)
    }
  }

  const removePokemon = (removePokemon: PokemonInterface) => {
    const ind = myPokemons.indexOf(removePokemon)
    if (ind > -1) {
      myPokemons.splice(ind, 1)
    }
    store.set(STORE_KEY, myPokemons)
    setMyPokemon(myPokemons)
  }

  useEffect(() => {
    const storeData = store.get(STORE_KEY)

    if (storeData) {
      setMyPokemon(storeData)
    }
  }, [])

  return (
    <>
      <MyPokemonContext.Provider value={{ myPokemons, addNewPokemon, removePokemon, showCatchModal }}>
        {children}
      </MyPokemonContext.Provider>
      <Modal show={catchModal} onHide={() => showCatchModal(false)} centered>
        <Modal.Body className='text-center'>
          <h4>Modal Confirm</h4>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => showCatchModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}