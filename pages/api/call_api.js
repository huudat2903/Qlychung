import axios from 'axios';
class callApi {

  // api register employee
  static async registerEp(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/employee/register', data);
      response = call;
    } catch (error) {
      response = error.response.data.error.message
    }
    return response;
  }

  //api register company
  static async registerCom(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/Company/register', data);
      response = call;
    } catch (error) {
      response = error.response.data.error.message
    }
    return response;
  }

  // api register personal
  static async registerPersonal(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/individual/register', data);
      response = call;
    } catch (error) {
      response = error.response.data.error.message;
    }
    return response;
  }

  // api check vip
  static async checkVip(idCom) {
    let response = '';
    const call = await axios.post('https://chamcong.24hpay.vn/service/verify_vip.php', { idCom: idCom });
    response = call;
    return response;
  }

  // api login personal
  static async loginPersonal(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/individual/login', { phoneTK: data.email, password: data.password });
      response = call;

    } catch (error) {
      response = error;
    }
    return response;
  }

  // api login employee
  static async loginEmployee(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/employee/login', data);
      response = call;
    } catch (error) {
      response = error.response.data.error.message
    }
    return response;
  }

  // api login company
  static async loginCompany(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlc/employee/login', data);
      response = call;
    } catch (error) {
      response = error.response.data.error.message
    }
    return response;
  }

  //  ????
  static async quen_mat_khau(data) {
    let response = '';
    try {
      const call = await axios.post('http://210.245.108.202:3000/api/qlcemployee/forgotPassword ', data);
      response = call;
    } catch (error) {
      response = error.message;
    }
    return response;
  }

  // api get infor personal
  static getInfoPersonal(headers) {
    let response = '';
    try {
      const call = axios.post('http://210.245.108.202:3000/api/qlc/individual/info', {}, (headers));
      response = call;
    } catch (error) {
      response = error.message;
    }
    return response;
  }

  // api get infor employee
  // api get infor employy
  static async getInfoEp(token) {
    let response = ''
    try {
      const call = axios.post('http://210.245.108.202:3000/api/qlc/employee/info', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      response = call;
    } catch (error) {
      response = error
    }

    return response
  }

  // api change password employee
  static async changePassEp(token, data) {
    let response = ''
    try {
      const call = axios.post('http://210.245.108.202:3000/api/qlc/employee/updatePassword', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      response = call;
    } catch (error) {
      response = error.response.data.error.message
    }

    return response
  }

  // api change password personal
  static async changePassPersonal(token, data) {
    let response = ''
    try {
      const call = axios.post('http://210.245.108.202:3000/api/qlc/individual/updatePassword', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      response = call;
    } catch (error) {
      response = error.response.data.error.message
    }
    return response
  }

  // api authen personal
  static async authenPersonal(token) {
    let response = ''
    try {
      const call = axios.post('http://210.245.108.202:3000/api/qlc/employee/verify', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      response = call;
    } catch (error) {
      response = error.response.data.error.message
    }
    return response
  }
}

export default callApi;