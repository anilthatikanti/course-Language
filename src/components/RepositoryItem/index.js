// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {RepositoryDetails} = props
  const {
    avatarUrl,
    forksCount,
    issuesCount,
    name,
    starsCount,
  } = RepositoryDetails
  return (
    <li className="card">
      <img className="logo" src={avatarUrl} alt={name} />
      <h1 className="cardHeading">{name}</h1>
      <div className="countContainer">
        <img
          className="cardLogo"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="cardPara">{starsCount} stars</p>
      </div>
      <div className="countContainer">
        <img
          className="cardLogo"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="cardPara">{forksCount} forks</p>
      </div>
      <div className="countContainer">
        <img
          className="cardLogo"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="cardPara">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
