import './App.css'
import Chess from './Chess'

function App() {
  return (
    <>
      <div className='heading'>
        <h1>Chess</h1>
      </div>
      <Chess />
      <div style={{ fontSize: "0.8rem", marginTop: ".8em" }}>
        made by <a href="http://austin-weeks.github.io" target="_blank">austin weeks</a>
      </div>

    </>
  )
}

export default App
