import Header from './Header'
import FetchLoader from './FetchLoader'
import CartOverview from './../cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'

const AppLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  // console.log(navigation);

  // .layout {
  //   display: grid;
  //   grid-template-rows: auto 1fr auto;
  //   gap: 32px;
  //   height: 100dvh;
  // }
  
  return (
    <div className='grid grid-rows-[auto_1fr_auto] gap-8 h-[100dvh]'>
        {isLoading && <FetchLoader />}

        <Header />
        <div>
          <main className='p-16 max-w-3xl mx-auto'>
            <Outlet />
          </main>
        </div>
        <CartOverview />
    </div>
  )
}

export default AppLayout