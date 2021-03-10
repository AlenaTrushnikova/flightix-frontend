import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container text-center">
                    <a className='mr-3 text-dark' target="_blank" rel="noopener noreferrer"
                       href="https://www.linkedin.com/in/alenatrushnikova/">
                        <i className="fab fa-linkedin-in"/>
                    </a>
                    <a className='mr-3 text-dark' target="_blank" rel="noopener noreferrer"
                       href="https://alenatrushnikova.medium.com/">
                        <i className="fab fa-medium-m"/>
                    </a>
                    <a className='text-dark' target="_blank" rel="noopener noreferrer"
                       href="https://github.com/AlenaTrushnikova">
                        <i className="fab fa-github"/>
                    </a>

                </div>
            </footer>
        )
    }
}

export default Footer