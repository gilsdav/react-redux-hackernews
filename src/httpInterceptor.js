import fetchIntercept from 'fetch-intercept';
import { i18n } from './i18n';

export default function registerHttpInterceptor () {

    // Global error catch
    fetchIntercept.register({
        response: function (response) {
          if (response.code >= 400) throw new Error('Request error');
          return response;
        }
    });

    fetchIntercept.register({
        request: function (url, config) {
            // Be sure headers exists
            if (!config) {
                config = {
                    headers: new Headers()
                };
            } else if (config && !config.headers) {
                config.headers = new Headers();
            }

            // Add basic configurations
            config.mode = config.mode ? config.mode : 'cors';
            config.cache = config.cache ? config.cache : 'default';

            // Add language header
            config.headers.set('language', i18n.locale);

            return [url, config];
        },
     
        requestError: function (error) {
            // Called when an error occured during another 'request' interceptor call
            console.log('request Error');
            return Promise.reject(error);
        },
     
        response: function (response) {
            // Modify the reponse object
            return response;
        },
     
        responseError: function (error) {
            console.log('response Error', error);
            // Handle an fetch error
            return Promise.reject(error);
        }
    });
}

