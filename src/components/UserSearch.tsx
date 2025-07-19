import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const UserSearch = () => {
    const [username, setUsername] = useState('')
    const [submittedUsername, setSubmittedUsername] = useState('')

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', submittedUsername],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${submittedUsername}`);
            if (!res.ok) throw new Error('User not Found');

            const data = await res.json();
            console.log(data)
            return data
        },
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
        </>
    )
}

export default UserSearch