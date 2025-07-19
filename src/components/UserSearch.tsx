import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FaGithubAlt } from 'react-icons/fa6'

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

        {data && (
           <div className='user-card'>
           <img src={data.avatar_url} alt={data.name} className='avatar' />
           <h2>{data.name || data.login}</h2>
           <p className='bio'>{data.bio}</p>
           <a
               href={data.html_url}
               className='profile-btn'
               target='_blank'
               rel='noopener noreferrer'
             >
               <FaGithubAlt /> View GitHub Profile
             </a>
           {/* <div className='user-card-buttons'>
             <button
               disabled={followMutation.isPending || unfollowMutation.isPending}
               onClick={handleFollow}
               className={`follow-btn ${isFollowing ? 'following' : ''}`}
             >
               {isFollowing ? (
                 <>
                   <FaUserMinus className='follow-icon' /> Following
                 </>
               ) : (
                 <>
                   <FaUserPlus className='follow-icon' /> Follow User
                 </>
               )}
             </button>
     
             <a
               href={user.html_url}
               className='profile-btn'
               target='_blank'
               rel='noopener noreferrer'
             >
               <FaGithubAlt /> View GitHub Profile
             </a>
           </div> */}
         </div>
        )}
        </>
    )
}

export default UserSearch