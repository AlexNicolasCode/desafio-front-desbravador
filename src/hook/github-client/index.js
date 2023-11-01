import axios from "axios";

export const useGitHubClient = () => {
    return axios.create({
        baseURL: 'https://api.github.com'
    });
}