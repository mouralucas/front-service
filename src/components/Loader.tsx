import {ReactElement} from 'react'
import '../assets/core/loader.css'


const App = (): ReactElement => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
    )
}

export default App;