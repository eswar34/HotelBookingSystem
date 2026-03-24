(function () {
    angular
        .module("adminApp", [])
        .controller("AdminController", ["$http", "$q", function ($http, $q) {
            var vm = this;
            var tokenKey = "admin_token";

            vm.loading = false;
            vm.error = "";
            vm.success = "";
            vm.managers = [];
            vm.customers = [];
            vm.adminName = "Admin";
            vm.login = {
                email: "",
                password: ""
            };

            vm.newManager = {
                fullName: "",
                email: "",
                password: "",
                hotelName: "",
                location: "",
                starRating: 3
            };

            vm.isLoggedIn = !!localStorage.getItem(tokenKey);

            vm.adminLogin = function () {
                vm.error = "";
                vm.success = "";
                vm.loading = true;

                $http.post("/api/admin/login", vm.login)
                    .then(function (res) {
                        var data = res.data || {};
                        localStorage.setItem(tokenKey, data.token || "");
                        vm.isLoggedIn = true;
                        vm.adminName = (data.user && data.user.fullName) ? data.user.fullName : "Admin";
                        vm.login.password = "";
                        vm.success = "Login successful.";
                        return vm.loadAll();
                    })
                    .catch(function (err) {
                        vm.error = readError(err, "Login failed.");
                    })
                    .finally(function () {
                        vm.loading = false;
                    });
            };

            vm.logout = function () {
                localStorage.removeItem(tokenKey);
                vm.isLoggedIn = false;
                vm.managers = [];
                vm.customers = [];
                vm.success = "Logged out.";
                vm.error = "";
            };

            vm.createManager = function () {
                vm.error = "";
                vm.success = "";
                vm.loading = true;

                authorizedPost("/api/admin/managers", vm.newManager)
                    .then(function () {
                        vm.success = "Manager added successfully.";
                        vm.newManager = {
                            fullName: "",
                            email: "",
                            password: "",
                            hotelName: "",
                            location: "",
                            starRating: 3
                        };
                        return vm.loadManagers();
                    })
                    .catch(function (err) {
                        vm.error = readError(err, "Unable to add manager.");
                    })
                    .finally(function () {
                        vm.loading = false;
                    });
            };

            vm.loadManagers = function () {
                return authorizedGet("/api/admin/managers")
                    .then(function (res) {
                        vm.managers = res.data || [];
                    })
                    .catch(function (err) {
                        vm.error = readError(err, "Unable to load managers.");
                    });
            };

            vm.loadCustomers = function () {
                return authorizedGet("/api/admin/customers")
                    .then(function (res) {
                        vm.customers = res.data || [];
                    })
                    .catch(function (err) {
                        vm.error = readError(err, "Unable to load customers.");
                    });
            };

            vm.loadAll = function () {
                return $q.all([vm.loadManagers(), vm.loadCustomers()]);
            };

            function getToken() {
                return localStorage.getItem(tokenKey) || "";
            }

            function authHeaders() {
                return {
                    Authorization: "Bearer " + getToken()
                };
            }

            function authorizedGet(url) {
                return $http.get(url, { headers: authHeaders() });
            }

            function authorizedPost(url, payload) {
                return $http.post(url, payload, { headers: authHeaders() });
            }

            function readError(err, fallback) {
                if (err && err.data) {
                    return err.data.message || err.data.title || fallback;
                }
                return fallback;
            }

            if (vm.isLoggedIn) {
                vm.loadAll();
            }
        }]);
})();
