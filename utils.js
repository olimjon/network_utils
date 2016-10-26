var _ = require('underscore');

var Utils = {
    api_host: 'https://api.shajara.co',
    server_host: 'https://dev.shajara.co',
    loadAuthorized: function (props, callback) {
        if (_.isEmpty(props.contentType)) {
            props.contentType = "application/json";
        }
        if (_.isEmpty(props.dataType)) {
            props.dataType = "json";
        }
        if (_.isEmpty(props.type)) {
            props.type = "GET";
        }
        if (_.isEmpty(props.server)) {
            if (props.server == 'api') {
                props.server = this.api_host;
            } else if (props.server == 'server') {
                props.server = this.server_host;
            } else {
                props.server = this.api_host;
            }
        }
        if (_.isEmpty(props.beforeSend)) {
            props.beforeSend = function (request) {
                request.setRequestHeader('HB-User-Id', localStorage.id);
                request.setRequestHeader('HB-Token', localStorage.token);
            };
        }

        $.ajax({
            url: props.server + 'props.url',
            dataType: props.dataType,
            contentType: props.contentType,
            type: 'GET',
            success: function (data) {
                if (!_.isEmpty(callback) && data.code == 0) {
                    callback(null, data);
                } else {
                    callback({msg: 'Server error happened'}, data);
                }
            }
            ,
            error: function () {
                if (!_.isEmpty(callback)) {
                    callback({msg: 'AJAX error happened'});
                }
            }
            ,
            beforeSend: props.beforeSend, complete: function () {
            }
        });
    },
    load: function (props, callback) {
        props.beforeSend = function () {
        };
        this.loadAuthorized(props, callback)
    },
}

module.exports = Utils;
