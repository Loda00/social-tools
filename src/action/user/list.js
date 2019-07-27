// import { toast } from 'components';
// import i18n from 'i18n';
import fetch from '../../utils/fetch';

export function error(error) {
  return {
    type: 'USER_LIST_ERROR', error,
  };
}

export function loading(loading) {
  return {
    type: 'USER_LIST_LOADING', loading,
  };
}

export function success(data) {
  return {
    type: 'USER_LIST_SUCCESS', data,
  };
}

export function list(page = '/companies') {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(error(''));

    fetch(page)
      .then(response => response.json())
      .then((data) => {
        dispatch(loading(false));
        dispatch(success(data));
      })
      .catch((e) => {
        // toast.error(i18n.t('toastError'));
        dispatch(loading(false));
        dispatch(error(e.message));
      });
  };
}

export function reset() {
  return {
    type: 'USER_LIST_RESET',
  };
}
