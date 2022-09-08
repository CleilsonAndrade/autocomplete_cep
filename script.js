const addressForm = document.querySelector('#address-form')
const cepInput = document.querySelector('#cep')
const addressInput = document.querySelector('#address')
const cityInput = document.querySelector('#city')
const neighborhoodInput = document.querySelector('#neighborhood')
const regionInput = document.querySelector('#region')
const formInputs = document.querySelectorAll('[data-input]')
const fadeElement = document.querySelector('#fade')

const closeButton = document.querySelector('#close-message')

cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers= /[0-9]/;

  const key = String.fromCharCode(e.keyCode)

  if(!onlyNumbers.test(key)){
    e.preventDefault()
    return
  }
})

cepInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value

  if(inputValue.length === 8){
    getAddress(inputValue)
  }
})

const getAddress = async (cep) => {
  toggleLoader()

  cepInput.blur()
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

  const response = await fetch(apiUrl)

  const data = await response.json()

  if(data.erro === 'true'){
    if(!addressInput.hasAttribute('disabled')){
      toggleDisabled()
    }

    addressForm.reset()
    toggleLoader()
    toggleMessage('CEP inválido tente novamente')
    return
  }
  
  if(addressInput.value === ''){
    toggleDisabled()
  }

  addressInput.value = data.logradouro
  cityInput.value = data.localidade
  neighborhoodInput.value = data.bairro
  regionInput.value = data.uf

  toggleLoader()
}

const toggleDisabled = () => {
  if(regionInput.hasAttribute('disabled')){
    formInputs.forEach((e) => {
      e.removeAttribute('disabled')
    })
  } else{
    formInputs.forEach((e) => {
      e.setAttribute('disabled', 'disabled')
    })
  }
}



const toggleLoader = () => {
  const loaderElement = document.querySelector('#loader')

  Array(fadeElement, loaderElement).forEach((e) => {
    e.classList.toggle('hide')
  })
}

const toggleMessage = (msg) => {
  const messageElement = document.querySelector('#message')
  const messageElementText = document.querySelector('#message p')

  messageElementText.innerText = msg

  Array(fadeElement, messageElement).forEach((e) => {
    e.classList.toggle('hide')
  })
}

closeButton.addEventListener('click', () => toggleMessage())

addressForm.addEventListener('submit', (e) => {
  e.preventDefault()

  toggleLoader()

  setTimeout(() => {
    toggleLoader()
    toggleMessage('Endereço salvo com sucesso')
    addressForm.reset()
    toggleDisabled()
  }, 1500)
})