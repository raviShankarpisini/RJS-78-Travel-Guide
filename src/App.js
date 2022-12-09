import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here

const Country = props => {
  const {each} = props
  const {id, name, imageUrl, description} = each
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
    </li>
  )
}

class App extends Component {
  state = {isLoading: true, countriesList: []}

  componentDidMount() {
    this.fetchUrlData()
  }

  fetchUrlData = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    const updatedData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))
    this.setState({countriesList: updatedData, isLoading: false})
  }

  render() {
    const {countriesList, isLoading} = this.state
    return (
      <div>
        <h1>Travel Guide</h1>
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul>
            {countriesList.map(each => (
              <Country each={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default App
