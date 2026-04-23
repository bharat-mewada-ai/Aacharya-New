// XP Hook - STRICT IMPLEMENTATION
import { useApp } from '../context/AppContext';

export const useXP = () => {
  const { state, dispatch } = useApp();

  const addXP = (amount) => {
    dispatch({ type: 'ADD_XP', payload: amount });
  };

  const hideRankUpCinematic = () => {
    dispatch({ type: 'HIDE_RANK_UP_CINEMATIC' });
  };

  return {
    xp: state.xp,
    rank: state.rank,
    showRankUpCinematic: state.showRankUpCinematic,
    addXP,
    hideRankUpCinematic
  };
};
