// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {tabDetails, selectedTab, className} = props
  const {id, language} = tabDetails
  const btnClass = className ? 'selectBtn' : 'normalBtn'

  const onClickedTab = () => {
    selectedTab(id)
  }

  return (
    <li className="list">
      <button className={btnClass} type="button" onClick={onClickedTab}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
