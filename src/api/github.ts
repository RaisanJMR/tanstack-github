export const fetchGithubUser = async (username: string) => {
    const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);
    if (!response.ok) {
        throw new Error('User not Found');
    }
    const data = await response.json(); 
    return data;
}