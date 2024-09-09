import style from './PageStyle.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Main from '../../components/Main/Main'


const DashboardPage = () => {

    
  return (
    <div>
      <h1>Bienvenido</h1>
      <h2 className={style.titulo}>Dashboard</h2>
      <Sidebar/>
      <Main />
   
    </div>
  )
}

export default DashboardPage
