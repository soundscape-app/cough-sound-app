// import AuthStore from 'stores/AuthStore';

const ErrorHandler = {

  // API 요청 시 발생하는 오류를 보여주는 함수
  Api: (error: any, message?: String, url?: String, body?: Object, headers?: Object) => {
    // if (error.response!.status === 401) AuthStore.loadLocalData();
    // else {
    console.log("[API ERROR]", message ? message : "");
    if (url) console.log("URL:", url);
    if (body) console.log("BODY:\n", JSON.stringify(body));
    if (headers) console.log("HEADER:\n", JSON.stringify(headers));
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error Message:', error.message);
    }
    console.log(error.config);
    console.log("[API ERROR END]");
    // }
  },
  
  // 알림으로 오류 내용을 보여주는 함수
  Alert: (message: string) => {
    alert(message);
  }
}


export default ErrorHandler;