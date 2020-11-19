import apiClient from './AxiosInterceptors';

class ApiService {
  getParkingSpaceList = (callback) => apiClient.getRequest('parking',callback);
  bookHourlySlot = (data,callback) => apiClient.postRequest('parking/bookslot',data,callback);
  settleDeposition = (data,callback) => apiClient.postRequest('sensor/settle',data,callback);
  getBalance = (id,callback) => apiClient.getRequest('parking'+id,callback);
  getSensorFee = (data,callback) => apiClient.postRequest('sensor/getfee',data,callback);
  depositSensor = (data,callback) => apiClient.postRequest('sensor/deposit',data,callback);

  demoGetRequest = (callback) => apiClient.getRequest('todos/1', callback);
  demoPostRequest = (data, callback) => apiClient.postRequest('posts', data, callback);
}
export default new ApiService();
