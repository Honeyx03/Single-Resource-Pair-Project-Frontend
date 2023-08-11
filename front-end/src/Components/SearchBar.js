export default function SearchBar({searchGame, handleSearchChange, setSearchGame}) {

    return (
      <div>
          <div className="search-bar">
            <input
                type="text"
                placeholder="Search for a game..."
                value={searchGame}
                onChange={handleSearchChange}
            />
          </div>
      </div>
    );
  }