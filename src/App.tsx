import { useState } from 'react'
import './App.css'
import Message from './Message'

var username;
var avatarURL;

function setupAccount()
{
  username = prompt("Insira seu nome de usuário: ");
  avatarURL = prompt("Insira a URL de uma imagem para ser seu avatar: ");

  localStorage.setItem("username", username = "");
  localStorage.setItem("avatarURL", avatarURL = "");
}

if(!username || username == "" || username == "null")
  setupAccount();

function App() {

  const [count, setCount] = useState(0)

  var username = localStorage.getItem("username");
  var avatarURL = localStorage.getItem("avatarURL");

  return (
    <>
      <ul id="messages">
        <Message username="teste" content="teste" avatar="https://i.imgur.com/qgtxe94.jpeg" timestamp={0} />
      </ul>
      <form id="form" action="">
        <input id="input" autoComplete="off" /><button>Enviar</button>
      </form>
    </>
  )
}

export default App
