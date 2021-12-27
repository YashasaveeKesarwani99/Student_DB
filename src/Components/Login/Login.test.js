import { render,screen } from '@testing-library/react'
import Login from './Login'

test('login renders when component gets mount',()=>{
    render(<Login/>)

    screen.debug()
})