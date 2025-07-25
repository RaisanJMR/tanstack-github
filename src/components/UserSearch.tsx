import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchGithubUser } from '../api/github'
import UserCard from './UserCard'

const UserSearch = () => {
    const [username, setUsername] = useState('')
    const [submittedUsername, setSubmittedUsername] = useState('')

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', submittedUsername],
        queryFn: () => fetchGithubUser(submittedUsername.trim()),
        enabled: !!submittedUsername
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('CLICKED...')
        setSubmittedUsername(username.trim())
    }
    return (
        <>
        <form onSubmit={handleSubmit} className="form">
            <input type="text" name="username" id="username" placeholder='Enter Github Username...' value={username} onChange={(e) => setUsername(e.target.value)} />
            <button type="submit">Search</button>
        </form>
        {isLoading && <p className='status'>Loading...</p>}
        {isError && <p className='status error'>{error.message}</p>}

        {data && (
          <UserCard user={data} />     
        )}
        </>
    )
}

export default UserSearch