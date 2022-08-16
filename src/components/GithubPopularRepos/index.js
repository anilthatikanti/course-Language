import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    language: [],
    tabId: languageFiltersData[0].id,
    status: apiStatus.initial,
  }

  componentDidMount = () => {
    this.getLanguage()
  }

  getLanguage = async () => {
    this.setState({status: apiStatus.loading})
    const {tabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${tabId}`
    const response = await fetch(url)
    const Data = await response.json()
    if (response.ok === true) {
      const updateData = Data.popular_repos.map(data => ({
        avatarUrl: data.avatar_url,
        forksCount: data.forks_count,
        issuesCount: data.issues_count,
        name: data.name,
        starsCount: data.stars_count,
      }))
      this.setState({language: updateData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  selectedTab = id => {
    this.setState({tabId: id}, this.getLanguage)
  }

  Loading = () => (
    <div testid="loader" className="loading">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  Success = () => {
    const {language} = this.state
    return (
      <>
        {language.map(Repository => (
          <RepositoryItem
            RepositoryDetails={Repository}
            key={Repository.name}
          />
        ))}
      </>
    )
  }

  Failure = () => (
    <div>
      <img
        className="errorLogo"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  operation = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.Loading()
      case apiStatus.success:
        return this.Success()
      case apiStatus.failure:
        return this.Failure()
      default:
        return 'null'
    }
  }

  render() {
    const {tabId} = this.state
    return (
      <div className="container">
        <h1>Popular</h1>
        <ul className="tabContainer">
          {languageFiltersData.map(eachTab => (
            <LanguageFilterItem
              key={eachTab.id}
              tabDetails={eachTab}
              selectedTab={this.selectedTab}
              className={tabId === eachTab.id}
            />
          ))}
        </ul>
        <ul className="cardContainer">{this.operation()}</ul>
      </div>
    )
  }
}
export default GithubPopularRepos
