import './Alert.css'

const Alert = ({setShowScore, setAlert, notSelected}) => {

  return (
    <div className='alert'>
        <div className="alert-text">
            <h3>Sizda {notSelected} ta belgilanmagan savollar mavjud</h3>
            <h4>Davom etasizmi?</h4>
        </div>
        <div className="alert-actions">
            <button className="alert-yes correct" onClick={() => setShowScore(true)}>Ha</button>
            <button className='alert-back wrong' onClick={() => setAlert(false)}>Orqaga qaytish</button>
        </div>
    </div>

  )
}

export default Alert