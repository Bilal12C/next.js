import '../styles/global.css'
import Nav from '../components/Nav'
import Provider from '../components/Provider'
export const metdata = {
    title:'Promptopia',
    description:'Discover and Share Ai Prompts'
}
function Rootlayout({children}) {
  return (
    <html lang='en'>
     <body>
      <Provider>
      <div className='main'>
        <div className='gradient'>
        </div>
        </div>
        <div>
            <main className='app'>
                <Nav/>
         {children}
            </main>
        </div>
      </Provider>
     </body>
    </html>
  )
}

export default Rootlayout