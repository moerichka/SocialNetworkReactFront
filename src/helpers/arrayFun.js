
  
  export const createOptions = (array, param, value) => {
    return array?.map((elem, index) => ({
      value: elem[value],
      label: elem[param],
    }));
  };
  