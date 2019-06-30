"use strict";
var Events = (function () {
    function Events() {
    }
    Events.click = function (elem, name) {
        if (name[0] === '#') {
            return name === elem.id;
        }
        else if (name[0] === '.') {
            return elem.classList.contains(name);
        }
        else {
            return false;
        }
    };
    Events.toggle = function (elem) {
        return elem.classList.toggle('hide');
    };
    return Events;
}());
var Tabs = (function () {
    function Tabs() {
    }
    Tabs.switchTab = function () {
        var _this = this;
        var elem = document.querySelectorAll('.tab');
        Object.keys(elem).map(function (index) {
            elem[index].onclick = function () {
                var item = elem[index];
                if (!Events.click(item, 'active')) {
                    Object.keys(elem).map(function (i) {
                        var elemNew = elem[i];
                        if (elemNew.classList.contains('active')) {
                            _this.toggleActive(elemNew);
                        }
                    });
                    _this.toggleActive(item);
                }
            };
        });
    };
    Tabs.toggleActive = function (item) {
        item.classList.toggle('active');
        var id = item.getAttribute('data-id');
        var tab = document.getElementById("tab-" + id);
        tab.classList.toggle('active');
    };
    return Tabs;
}());
var DropDown = (function () {
    function DropDown() {
    }
    DropDown.prototype.connection = function () {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);
    };
    return DropDown;
}());
var Profile = (function () {
    function Profile() {
    }
    Profile.prototype.edit = function () {
        var elemEdit = document.getElementById('profile-edit');
        var elemSave = document.getElementById('profile-save');
        var username = document.getElementById('profile-username');
        var saveUsername = document.getElementById('profile-username-save');
        elemEdit.onclick = function () {
            Profile.toggleField(elemEdit, elemSave);
        };
        elemSave.onclick = function () {
            Profile.toggleField(elemEdit, elemSave);
        };
        username.onclick = function () {
            Profile.toggleUsername(username);
        };
        saveUsername.onclick = function () {
            Profile.toggleUsername(username);
        };
        this.password();
    };
    Profile.toggleUsername = function (elem) {
        var action = document.getElementById('profile-action');
        Events.toggle(elem);
        Events.toggle(elem.nextElementSibling);
        Events.toggle(action);
    };
    Profile.toggleField = function (elemEdit, elemSave) {
        Events.toggle(elemEdit);
        Events.toggle(elemSave);
        var profileName = document.getElementById('profile-name');
        Events.toggle(profileName);
        Events.toggle(profileName.nextElementSibling);
    };
    Profile.prototype.password = function () {
        var elem = document.getElementById('edit-password');
        var button = document.getElementById('password-button');
        elem.onclick = function () {
            var parent = elem.parentElement;
            Events.toggle(parent);
            Events.toggle(parent.nextElementSibling);
            Events.toggle(parent.parentElement.nextElementSibling);
        };
        button.onclick = function () {
            var parent = button.parentElement;
            Events.toggle(parent);
            Events.toggle(parent.previousElementSibling);
            Events.toggle(parent.parentElement.nextElementSibling);
        };
    };
    Profile.prototype.sessions = function () {
        var link = document.getElementById('sessions');
        var block = document.getElementById('history-sessions');
        var button = document.getElementById('sessions-button');
        var blockBody = document.getElementById('security-modal');
        link.onclick = function () {
            Events.toggle(block);
            Events.toggle(blockBody);
        };
        button.onclick = function () {
            Events.toggle(block);
            Events.toggle(blockBody);
        };
        this.clearSession();
    };
    Profile.prototype.clearSession = function () {
        var clearAll = document.getElementById('clear-all-session');
        var clearRow = document.getElementsByClassName('sessions-item');
        clearAll.onclick = function () {
            var sessions = document.getElementById('other-history-session');
            while (sessions) {
                if (!sessions.firstChild) {
                    break;
                }
                sessions.removeChild(sessions.firstChild);
            }
            Events.toggle(clearAll);
        };
        Object.keys(clearRow).map(function (index) {
            var row = clearRow[index];
            row.onclick = function () {
                row.remove();
            };
        });
    };
    return Profile;
}());
var Modal = (function () {
    function Modal() {
    }
    Modal.prototype.connection = function () {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    };
    Modal.profie = function () {
        var profile = new Profile();
        profile.edit();
        profile.sessions();
    };
    return Modal;
}());
var App = (function () {
    function App() {
    }
    App.prototype.components = function () {
        document.addEventListener('DOMContentLoaded', function () {
            var modal = new Modal();
            var dropdown = new DropDown();
            modal.connection();
            dropdown.connection();
            Modal.profie();
        });
    };
    App.prototype.init = function () {
        this.components();
        Tabs.switchTab();
    };
    return App;
}());
var app = new App();
app.init();
//# sourceMappingURL=main.js.map