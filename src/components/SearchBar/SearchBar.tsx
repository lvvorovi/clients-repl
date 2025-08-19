import { useState, useRef } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    // Trigger search on every keystroke after 2 characters
    if (value.length >= 2) {
      onSearch(value)
    } else if (value.length === 0) {
      onSearch('')
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <i className="fas fa-search search-icon"></i>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for spare parts..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        {query && (
          <button
            type="button"
            className="clear-button"
            onClick={() => {
              setQuery('')
              onSearch('')
              inputRef.current?.focus()
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </form>
  )
}

export default SearchBar