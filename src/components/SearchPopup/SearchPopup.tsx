import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { closeSearchPopup } from '../../store/slices/uiSlice'
import './SearchPopup.css'

const SearchPopup = () => {
  const dispatch = useDispatch()
  const { searchPopup } = useSelector((state: RootState) => state.ui)

  if (!searchPopup.isOpen) return null

  return (
    <div className="search-popup">
      <div className="search-popup-header">
        <h3>Search Results</h3>
        <button 
          className="close-button"
          onClick={() => dispatch(closeSearchPopup())}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className="search-popup-content">
        {searchPopup.loading ? (
          <div className="loading-container">
            <div className="loading"></div>
            <p>Searching...</p>
          </div>
        ) : (
          <>
            {searchPopup.results.length > 0 ? (
              <div className="search-results">
                <p className="results-count">
                  Found {searchPopup.results.length} result(s) for \"{searchPopup.query}\"
                </p>
                <div className="results-list">
                  {searchPopup.results.map((result: any) => (
                    <div key={result.id} className="result-item">
                      <div className="result-main">
                        <span className="part-number">{result.partNumber}</span>
                        <span className="brand">{result.brand}</span>
                      </div>
                      <p className="description">{result.description}</p>
                      <button className="add-to-request-btn btn btn-primary">
                        Add to Request
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>No parts found for \"{searchPopup.query}\"</p>
                <p className="no-results-subtitle">Try searching with a different part number or keyword</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPopup