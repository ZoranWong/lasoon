import queryString from 'query-string';
export default class ApiService {
    constructor(gateway, token) {
        this.headers = {};
        this.dataType = 'json';
        this.gateway = gateway;
        if (this.gateway) {
            let length = this.gateway.length;
            if (this.gateway[length - 1] === '/') {
                this.gateway = this.gateway.substr(0, length - 1);
            }
        }

        this.token = token;
    }
    url(route, query = null) {
        query = query ? query : {};
        if (route[0] === '/') {
            route = route.substr(1);
        }
        return `${this.gateway}/${route}?${queryString.stringify(query)}`;
    }
    setAuth() {
        this.headers['Authorization'] = `bearer ${this.token}`;
    }
    get(route, query = null, auth = true) {
        let url = this.url(route, query);
        console.log('url', url);
        if (auth) {
            this.setAuth();
        }
        return new Promise((resolve) => {
            my.httpRequest({
                url: url,
                method: 'GET',
                headers: this.headers,
                dataType: this.dataType,
                success: function(res) {
                    let data = res.data.data;
                    return resolve(data);
                },
                fail: function(res) {
                    return resolve(false);
                },
                complete: function(res) {
                    my.hideLoading();
                }
            });
        });
    }

    post(route, data, query = null, auth = true) {
        let url = this.url(route, query);
        if (auth) {
            this.setAuth();
        }
        return new Promise((resolve) => {
            my.httpRequest({
                url: url,
                method: 'POST',
                data: data,
                headers: this.headers,
                dataType: this.dataType,
                success: function(res) {
                    let data = res.data.data;
                    return resolve(data);
                },
                fail: function(res) {
                    return resolve(false);
                },
                complete: function(res) {
                    my.hideLoading();
                }
            });
        });
    }

    put(route, data, query = null, auth = true) {
        let url = this.url(route, query);
        if (auth) {
            this.setAuth();
        }
        return new Promise((resolve) => {
            my.httpRequest({
                url: url,
                method: 'PUT',
                headers: this.headers,
                dataType: this.dataType,
                success: function(res) {
                    let data = res.data.data;
                    return resolve(data);
                },
                fail: function(res) {
                    return resolve(false);
                },
                complete: function(res) {
                    my.hideLoading();
                }
            });
        });
    }

    delete(route, query = null, auth = true) {
        let url = this.url(route, query);
        if (auth) {
            this.setAuth();
        }
        return new Promise((resolve) => {
            my.httpRequest({
                url: url,
                method: 'DELETE',
                headers: this.headers,
                dataType: this.dataType,
                success: function(res) {
                    let data = res.data.data;
                    return resolve(data);
                },
                fail: function(res) {
                    return resolve(false);
                },
                complete: function(res) {
                    my.hideLoading();
                }
            });
        });
    }
}