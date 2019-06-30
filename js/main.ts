class Events{
    /**
     * Событие по click, сравнение элементов
     * @param elem
     * @param name
     */
    static click(elem: any, name: string): boolean {
        if (name[0] === '#') {
            return name === elem.id;
        } else if (name[0] === '.') {
            return elem.classList.contains(name);
        } else {
            return false;
        }
    }

    /**
     * Событие переключение видимость элемента
     * @param elem
     */
    static toggle(elem: any): void {
        return elem.classList.toggle('hide');
    }
}


class Tabs {
    /**
     * Событие на клике по селектору tab
     */
    static switchTab(): void {
        let elem: any = document.querySelectorAll('.tab');
        Object.keys(elem).map(index => {
            elem[index].onclick = () => {
                let item: any = elem[index];
                if (!Events.click(item, 'active')) {
                    Object.keys(elem).map(i => {
                        let elemNew = elem[i];
                        if (elemNew.classList.contains('active')) {
                            this.toggleActive(elemNew);
                        }
                    });
                    this.toggleActive(item);
                }
            }
        })
    }
    static toggleActive(item: any): void {
        item.classList.toggle('active');
        const id: any = item.getAttribute('data-id');
        let tab: any = document.getElementById(`tab-${id}`);
        tab.classList.toggle('active');
    }
}


interface Components {
    /**
     * Инициализация компонента
     */
    connection(): void;
}
class DropDown implements Components {
    connection(): void {
        const elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);
    }
}

class Profile {
    /**
     * Редактирование профиля
     */
    edit(): void {
        const elemEdit: any = document.getElementById('profile-edit');
        const elemSave: any = document.getElementById('profile-save');
        const username: any = document.getElementById('profile-username');
        const saveUsername: any = document.getElementById('profile-username-save');

        elemEdit.onclick = () => {
            Profile.toggleField(elemEdit, elemSave);
        };
        elemSave.onclick = () => {
            Profile.toggleField(elemEdit, elemSave);
        };

        username.onclick = () => {
            Profile.toggleUsername(username);
        };
        saveUsername.onclick = () => {
            Profile.toggleUsername(username);
        };

        this.password();
    }

    static toggleUsername(elem: any):void {
        const action: any = document.getElementById('profile-action');
        Events.toggle(elem);
        Events.toggle(elem.nextElementSibling);
        Events.toggle(action);
    }

    /**
     * Переключает видимость всех полей
     */
    static toggleField(elemEdit: any, elemSave: any): void {
        Events.toggle(elemEdit);
        Events.toggle(elemSave);
        const profileName: any = document.getElementById('profile-name');

        Events.toggle(profileName);
        Events.toggle(profileName.nextElementSibling);
    }

    /**
     * Делает видимость полей пароля
     */
    password():void {
        const elem: any = document.getElementById('edit-password');
        const button: any = document.getElementById('password-button');

        elem.onclick = () => {
            const parent = elem.parentElement;
            Events.toggle(parent);
            Events.toggle(parent.nextElementSibling);
            Events.toggle(parent.parentElement.nextElementSibling);
        };
        button.onclick = () => {
            const parent: any = button.parentElement;
            Events.toggle(parent);
            Events.toggle(parent.previousElementSibling);
            Events.toggle(parent.parentElement.nextElementSibling);
        }
    }
    sessions(): void {
        const link: any = document.getElementById('sessions');
        const block: any = document.getElementById('history-sessions');
        const button: any = document.getElementById('sessions-button');
        const blockBody: any = document.getElementById('security-modal');

        link.onclick = () => {
            Events.toggle(block);
            Events.toggle(blockBody);
        };

        button.onclick = () => {
            Events.toggle(block);
            Events.toggle(blockBody);
        };
        this.clearSession();
    }

    clearSession(): void {
        const clearAll: any = document.getElementById('clear-all-session');
        const clearRow: any = document.getElementsByClassName('sessions-item');

        clearAll.onclick = () => {
            const sessions: any = document.getElementById('other-history-session');
            while(sessions) {
                if (!sessions.firstChild) {
                    break;
                }
                sessions.removeChild(sessions.firstChild);
            }
            Events.toggle(clearAll);
        };

        Object.keys(clearRow).map(index => {
            let row = clearRow[index];
            row.onclick = () => {
                row.remove();
            }
        });
    }
}

class Modal implements Components{
    connection():void {
        const elems: any = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }

    /**
     * Событии подального окна профиля
     */
    static profie():void {
        const profile = new Profile();
        profile.edit();
        profile.sessions();
    }
}

interface Application {
    /**
     * Подключаем компоненты
     * @return void
     */
    components():void;

    /**
     * Инициализируем все событии
     * @return void
     */
    init(): void;
}

class App implements Application{
    components() {
        document.addEventListener('DOMContentLoaded', function() {
            const modal = new Modal();
            const dropdown = new DropDown();

            modal.connection();
            dropdown.connection();

            Modal.profie();
        });
    }

    init() {
        this.components();
        Tabs.switchTab();
    }
}

const app = new App();
app.init();
