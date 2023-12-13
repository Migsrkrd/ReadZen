import { TOGGLE_PROFILE_CONTROL } from '../utils/actions';

export const reducer = (state, action) => {
  switch (action.type) {

    case TOGGLE_PROFILE_CONTROL:
      return {
        ...state,
        profileControlOpen: !state.profileControlOpen,
      };

      default:
        return state;
  }
}