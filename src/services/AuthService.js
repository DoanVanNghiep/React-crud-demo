import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + 'authentication/login', {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('users', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    signup(username, password) {
        return axios.post(API_URL + 'signup', {
            username,
            password
        });
    }

    logout() {
        localStorage.removeItem('users');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('users'));
    }

    authHeader() {
        const user = JSON.parse(localStorage.getItem('users'));

        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return {};
        }
    }
    getCartKey() {
        const user = this.getCurrentUser();
        return user ? `cart_${user.username}` : 'cart';
    }

    saveCart(cart) {
        const cartKey = this.getCartKey();
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    loadCart() {
        const cartKey = this.getCartKey();
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    }

}

export default new AuthService();