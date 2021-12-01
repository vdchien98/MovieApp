import { getEpisodeStart, getEpisodeSuccess, getEpisodeFailure } from './episodeRedux';
import { userRequest } from '../../requestMethods';

// GET Episodes
export const getEpisodes = async (id, dispatch) => {
    dispatch(getEpisodeStart());
    try {
        const res = await userRequest.get('/episodes');
        const result = res.data.filter((word) => word.movieId === id);
        dispatch(getEpisodeSuccess(result));
    } catch (err) {
        dispatch(getEpisodeFailure());
    }
};
