import AxiosCostum from '../../helpers/AxiosCustom';

export const getListSearchFilter = dataParams => {
   const filledParams = [
      'category_id',
      'location',
      'payment_id',
      'name',
      'date',
      'payment_type',
      'isAvailable',
      'price_start',
      'price_end',
      'rate_start',
      'rate_end',
      'no_prepayment',
   ];
   const url = dataParams => {
      var result = '';
      filledParams.forEach(item => {
         if (dataParams[item]) {
            if (dataParams[item] !== '') {
               if (result == '') {
                  result = `${item}=${dataParams[item]}`;
               } else {
                  result += `&${item}=${dataParams[item]}`;
               }
            }
         }
      });
      if (dataParams.sort) {
         if (result == '') {
            result = `sort=${dataParams.sort}&order=${dataParams.order}`;
         } else {
            result += `&sort=${dataParams.sort}&order=${dataParams.order}`;
         }
      }

      return `${result}&limit=5`;
   };
   return {
      type: 'SEARCH_FILTER',
      payload: AxiosCostum().get(`/search?${url(dataParams)}&limit=10`),
   };
};

export const getNextListSearchFilter = url => {
   return {
      type: 'SEARCH_FILTER_NEXT',
      payload: AxiosCostum().get(url),
   };
};
