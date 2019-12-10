<template>
    <div class="form-container" id="form">
        <div class="form-title">Заявка на регистрацию пользователей</div>
        <div class="form">
            <div class="as-block" id="details">
                <div class="block-title">Реквизиты заявки</div>
                <div class="block-content">
                    <div class="data-line" v-for="item in formDetails" :key="item.id" v-show="item.value">
                        <div class="title">{{item.title}}</div>
                        <div class="value">{{item.value}}</div>
                    </div>
                </div>
            </div>
            <div class="as-block" id="users">
                <div class="block-title">Пользователи</div>
                <div class="block-content">
                    <div class="users-container">
                        <div class="user expanded" v-for="(user, userIndex) in users" :key="userIndex">
                            <div class="user-header">
                                <div class="expander"
                                     @click="$event.target.closest('.user').classList.toggle('expanded')">
                                    <svg viewBox="0 0 512 512">
                                        <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                                    </svg>
                                </div>
                                <div class="title"
                                     @click="$event.target.closest('.user').classList.toggle('expanded')">
                                    {{user.info.lastName}} {{user.info.firstName}} {{user.info.middleName}}
                                </div>
                                <div class="remove-button" @click="users.splice(userIndex, 1)">
                                    <svg viewBox="0 0 15 15">
                                        <path d="M2.64 1.27L7.5 6.13l4.84-4.84A.92.92 0 0 1 13 1a1 1 0 0 1 1 1 .9.9 0 0 1-.27.66L8.84 7.5l4.89 4.89A.9.9 0 0 1 14 13a1 1 0 0 1-1 1 .92.92 0 0 1-.69-.27L7.5 8.87l-4.85 4.85A.92.92 0 0 1 2 14a1 1 0 0 1-1-1 .9.9 0 0 1 .27-.66L6.16 7.5 1.27 2.61A.9.9 0 0 1 1 2a1 1 0 0 1 1-1c.24.003.47.1.64.27z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="user-data-container">
                                <div class="user-info">
                                    <div class="info-element" style="width: 100%;">
                                        <div class="element-title">Логин СУДИР</div>
                                        <div class="element-content">
                                            <hyper-select v-model="user.info.SUDIRlogin"
                                                          identifier="USER_INFO_BY_LOGIN"
                                                          :max-length="1"
                                                          @tag-selected="onPersonSelected(user.info.SUDIRlogin, user)"
                                                          @tag-removed="onPersonRemoved(user)"></hyper-select>
                                        </div>
                                    </div>
                                    <div class="info-element" style="width: 33%;">
                                        <div class="element-title">Фамилия</div>
                                        <div class="element-content">
                                            <input v-model="user.info.lastName" class="user-info-input"/>
                                        </div>
                                    </div>
                                    <div class="info-element" style="width: 33%;">
                                        <div class="element-title" style="width: 50px">Имя</div>
                                        <div class="element-content">
                                            <input v-model="user.info.firstName" class="user-info-input"/>
                                        </div>
                                    </div>
                                    <div class="info-element" style="width: 34%;">
                                        <div class="element-title" style="width: 70px">Отчество</div>
                                        <div class="element-content">
                                            <input v-model="user.info.middleName" class="user-info-input"/>
                                        </div>
                                    </div>
                                    <div class="info-element" style="width: 100%;">
                                        <div class="element-title">Организация</div>
                                        <div class="element-content">
                                            <input v-model="user.info.organisation" class="user-info-input"/>
                                            <!--<hyper-select v-model="user.info.organisation" identifier="ORGANIZATIONS" :max-length="1"></hyper-select>-->
                                        </div>
                                    </div>
                                    <div class="info-element" style="width: 100%;">
                                        <div class="element-title">Должность</div>
                                        <div class="element-content">
                                            <input v-model="user.info.position" class="user-info-input"/>
                                        </div>
                                    </div>

                                    <div class="info-element" style="width: 40%;">
                                        <div class="element-title">Эл. почта</div>
                                        <div class="element-content">
                                            <input v-model="user.info.email" class="user-info-input"/>
                                        </div>
                                    </div>
                                    <div class="info-element" style="width: 30%;">
                                        <div class="element-title">Телефон</div>
                                        <div class="element-content">
                                            <input v-model="user.info.phone" class="user-info-input"/>
                                        </div>
                                    </div>
                                    <div class="info-element" style="width: 30%;">
                                        <div class="element-title">№ кабинета</div>
                                        <div class="element-content">
                                            <input v-model="user.info.roomNumber" class="user-info-input"/>
                                        </div>
                                    </div>

                                    <div class="info-element" style="width: 100%;">
                                        <div class="element-title">Адрес</div>
                                        <div class="element-content">
                                            <input v-model="user.info.address" class="user-info-input"/>
                                        </div>
                                    </div>

                                    <div class="info-element" style="width: 100%;">
                                        <div class="element-title">Консультация</div>
                                        <div class="element-content">
                                            <checkbox :data="user.info.requireConsultation"></checkbox>

                                        </div>
                                    </div>

                                </div>
                                <div class="user-settings">
                                    <div class="settings-block" id="base-permissions">
                                        <div class="settings-block-title">Настройка доступа</div>
                                        <div class="settings-block-content">
                                            <div class="permissions-types">
                                                <div class="permission-type"
                                                     :class="[ui.collapsedPermissionTypes[typeIndex] ? 'collapsed' : '']"
                                                     v-for="(type, typeIndex) in user.basicPermissions.types"
                                                     :key="type.id">
                                                    <div class="type-name">{{type.title}}</div>
                                                    <div class="type-options">
                                                        <div class="type-option" v-for="option in type.options"
                                                             :key="option.id" :class="option.className">
                                                            {{option.title}}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="collapser"
                                                     :class="ui.collapsedPermissionTypes[1] ? 'collapsed' : ''"
                                                     @click="onPermissionTypeCollapse(1)">
                                                    <svg viewBox="0 0 192 512">
                                                        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div class="permissions-groups">
                                                <div class="permissions-group"
                                                     v-for="(group, groupIndex) in user.basicPermissions.groups"
                                                     :key="group.id"
                                                >
                                                    <div class="permission main">
                                                        <div class="expander"
                                                             @click="$event.target.closest('.permissions-group').classList.toggle('expanded')">
                                                            <svg viewBox="0 0 512 512">
                                                                <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                                                            </svg>
                                                        </div>
                                                        <div class="permission-title"
                                                             @click="$event.target.closest('.permissions-group').classList.toggle('expanded')">
                                                            {{groupIndex+1}}. {{group.title}}
                                                        </div>
                                                        <div class="permission-checkbox-groups">
                                                            <div class="permission-checkbox-group"
                                                                 v-for="(type, typeIndex) in user.basicPermissions.types"
                                                                 :key="type.id"
                                                                 :class="[ui.collapsedPermissionTypes[typeIndex] ? 'collapsed' : '']">
                                                                <div class="checkbox-wrapper"
                                                                     v-for="(option, optionIndex) in type.options"
                                                                     :key="option.id"
                                                                     :class="[option.className, isSemiFull(group, typeIndex, optionIndex) ? 'semi-full' : '']">
                                                                    <label class="checkbox-label"
                                                                           @click.prevent="onGroupOptionClick($event, group, typeIndex, optionIndex)">
                                                                        <div class="checkbox">
                                                                            <input class="checkbox-input"
                                                                                   :checked="isNestedChecked(group, typeIndex, optionIndex)"
                                                                                   type="checkbox"/>
                                                                            <div class="checkbox-indicator">
                                                                                <svg viewBox="0 0 512 512">
                                                                                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="permission"
                                                         v-for="permission in group.nested"
                                                         :key="permission.id">

                                                        <div class="permission-title">{{permission.title}}</div>
                                                        <div class="permission-checkbox-groups">
                                                            <div class="permission-checkbox-group"
                                                                 v-for="(type, typeIndex) in user.basicPermissions.types"
                                                                 :key="type.id"
                                                                 :class="{'collapsed': ui.collapsedPermissionTypes[typeIndex]}">

                                                                <div class="checkbox-wrapper"
                                                                     v-for="(option, optionIndex) in type.options"
                                                                     :class="option.className"
                                                                     :key="option.id">

                                                                    <label class="checkbox-label">
                                                                        <div class="checkbox">
                                                                            <input class="checkbox-input"
                                                                                   v-model="permission.values[typeIndex][optionIndex]"
                                                                                   type="checkbox"
                                                                                   @change="onBasicPermissionsCheckboxClick(permission, typeIndex, optionIndex)"/>

                                                                            <div class="checkbox-indicator">
                                                                                <svg viewBox="0 0 512 512">
                                                                                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="settings-block" id="additional-permissions" v-show="user.additionalPermissions.length">
                                        <div class="settings-block-title">Доступ к информации для служебного пользования
                                        </div>
                                        <div class="settings-block-content">
                                            <div class="checkbox-wrapper" v-for="permission in user.additionalPermissions"
                                                 :key="permission.id">
                                                <label class="checkbox-label">
                                                    <div class="checkbox">
                                                        <input v-model="permission.checked" class="checkbox-input"
                                                               type="checkbox"/>
                                                        <div class="checkbox-indicator">
                                                            <svg viewBox="0 0 512 512">
                                                                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="checkbox-text">{{permission.title}}</div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="settings-block" id="rationale">
                                        <div class="settings-block-title">Обоснование необходимости</div>
                                        <div class="settings-block-content">
                                            <textarea v-model="user.rationale"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="add-new-user as-button as-blue-button" @click="addNewUser">Добавить пользователя
                        </div>
                        <div v-show="users.length"
                             class="add-new-user-with-same-permissions as-button"
                             @click="addNewUserWithSamePermissions">Добавить пользователя с такими же правами
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-button as-button as-blue-button"
             :class="!canSubmit ? 'locked' : ''"
             @click="canSubmit ? submitForm() : false">Отправить на согласование</div>
    </div>
</template>

<script>
    /* eslint-disable implicit-arrow-linebreak,function-paren-newline */

    import X2JS from 'x2js';

    import HyperSelect from '@/components/ui/controls/hyper-select.vue';
    import Checkbox from '@/components/ui/controls/checkbox.vue';

    const x2js = new X2JS();

    export default {
        name: 'userManagement',
        components: {
            HyperSelect,
            Checkbox,
        },
        methods: {
            isSemiFull: (group, typeIndex, optionIndex) =>
                !group.nested.every(nested => nested.values[typeIndex][optionIndex]) && group.nested.some(nested => nested.values[typeIndex][optionIndex]),

            isNestedChecked: (group, typeIndex, optionIndex) =>
                group.nested.every(nested => nested.values[typeIndex][optionIndex]),

            onBasicPermissionsCheckboxClick(permission, typeIndex, optionIndex) {
                if (permission.values[typeIndex][optionIndex]) {
                    this.$set(permission.values[Math.abs(typeIndex - 1)], optionIndex, false);
                }
            },

            onGroupOptionClick(event, group, typeIndex, optionIndex) {
                group.nested.forEach(permission => {
                    const isChecked = event.target.closest('.checkbox').querySelector('input[type="checkbox"]').checked;

                    this.$set(permission.values[typeIndex], optionIndex, !isChecked);
                    this.onBasicPermissionsCheckboxClick(permission, typeIndex, optionIndex);
                });
            },

            onPermissionTypeCollapse(typeIndex) {
                this.ui.collapsedPermissionTypes.splice(typeIndex, 1, !this.ui.collapsedPermissionTypes[typeIndex]); // using splice to prevent using this.$forceUpdate()
            },

            getEmptyUser() {
                return this.$utils.clone(this.initialData.emptyUser);
            },

            addNewUser() {
                this.users.push(this.getEmptyUser());
            },

            addNewUserWithSamePermissions() {
                const newUser = this.getEmptyUser();
                const copiedLastUser = this.$utils.clone(this.users[this.users.length - 1]);

                newUser.basicPermissions = copiedLastUser.basicPermissions;
                newUser.additionalPermissions = copiedLastUser.additionalPermissions;

                this.users.push(newUser);
            },

            loadInitialDataFromXML(XML) {
                const basicPermissions = this.castBasicRolesTree(XML.querySelector('RESOURCES_TO_ACCESS').innerHTML);
                const additionalPermisions = this.castBasicRolesTree(XML.querySelector('RESOURCES_TO_ACCESS_DSP').innerHTML);
                const formDetails = x2js.xml2js(XML.querySelector('USERMAN_APP').innerHTML);

                this.initialData.emptyUser.basicPermissions.groups = this.$utils.clone(basicPermissions);


                additionalPermisions.forEach(permission => {
                    delete permission.nested;
                    permission.checked = false;
                });

                this.initialData.emptyUser.additionalPermissions = this.$utils.clone(additionalPermisions);

                if (formDetails) {
                    this.formDetails = [
                        {
                            id: 0,
                            title: 'Организация заявитель',
                            value: formDetails.ROW_SET.ROW.FV_ORG,
                        },
                        {
                            id: 1,
                            title: 'ФИО подписанта',
                            value: formDetails.ROW_SET.ROW.USERFIO,
                        },
                        {
                            id: 2,
                            title: 'Должность подписанта',
                            value: formDetails.ROW_SET.ROW.FV_PARTICIPANT_POST,
                        },
                    ];
                } else {
                    this.formDetails = [
                        {
                            id: 0,
                            title: 'Организация заявитель',
                            value: 'Не определено',
                        },
                        {
                            id: 1,
                            title: 'ФИО подписанта',
                            value: 'Не определено',
                        },
                        {
                            id: 2,
                            title: 'Должность подписанта',
                            value: 'Не определено',
                        },
                    ];
                }
            },

            castBasicRolesTree: xml => {
                const RawXmlAsJS = x2js.xml2js(xml).ROW_SET.ROW;

                const temp = [];
                const result = [];

                const uselessGroups = RawXmlAsJS.filter(permission => !permission.ID_PARENT);

                RawXmlAsJS.filter(permission => permission.ID_PARENT).forEach(permission => {
                    if (uselessGroups.find(group => group.ID === permission.ID_PARENT))
                        delete permission.ID_PARENT;

                    temp.push(permission);
                });

                temp.filter(permission => !permission.ID_PARENT)
                    .forEach(permissionHead => {
                        const group = {
                            id: permissionHead.ID,
                            title: permissionHead.NAME,
                            nested: [],
                        };

                        result.push(group);

                        temp.filter(permission => permission.ID_PARENT === group.id)
                            .forEach(permission => {
                                group.nested.push({
                                    id: permission.ID,
                                    title: permission.NAME,
                                    values: [[false, false], [false, false]],
                                });
                            });

                        if (!group.nested.length) {
                            group.nested.push({
                                id: group.id,
                                title: group.title,
                                values: [[false, false], [false, false]],
                            });
                        }
                    });

                return result;
            },

            serializeFormAsJS: users => {
                const result = {
                    FORM: {
                        PERSONS: { PERSON: [] },
                    },
                };

                users.forEach(user => {
                    const userData = {
                        LOGIN: (user.info.SUDIRlogin.selected[0] || {}).objectId || user.info.SUDIRlogin.input,
                        LAST_NAME: user.info.lastName,
                        FIRST_NAME: user.info.firstName,
                        MIDDLE_NAME: user.info.middleName,
                        ORGANIZATION: user.info.organisation,
                        POSITION: user.info.position,
                        EMAIL: user.info.email,
                        PHONE: user.info.phone,
                        ROOM_NUMBER: user.info.roomNumber,
                        ADDRESS: user.info.address,
                        REQUIRE_CONSULTATION: user.info.requireConsultation,
                        BASIC_PERMISSIONS: {},
                        ADDITIONAL_PERMISSIONS: {},
                        RATIONALE: user.rationale,
                    };

                    user.basicPermissions.groups.forEach(group => {
                        group.nested.forEach(permission => {
                            const resultPermission = {
                                ID: permission.id,
                            };

                            permission.values.forEach((type, typeIndex) => {
                                type.forEach((option, optionIndex) => {
                                    if (option)
                                        resultPermission[user.basicPermissions.types[typeIndex].xmlTag] = user.basicPermissions.types[typeIndex].options[optionIndex].xmlString;
                                });
                            });

                            if (Object.keys(resultPermission).length > 1) {
                                if (!userData.BASIC_PERMISSIONS.PERMISSION) {
                                    userData.BASIC_PERMISSIONS.PERMISSION = [];
                                }

                                userData.BASIC_PERMISSIONS.PERMISSION.push(resultPermission);
                            }
                        });
                    });

                    user.additionalPermissions.forEach(permission => {
                        if (permission.checked) {
                            if (!userData.ADDITIONAL_PERMISSIONS.PERMISSION) {
                                userData.ADDITIONAL_PERMISSIONS.PERMISSION = [];
                            }

                            userData.ADDITIONAL_PERMISSIONS.PERMISSION.push({
                                ID: permission.id,
                            });
                        }
                    });

                    result.FORM.PERSONS.PERSON.push(userData);
                });

                return result;
            },

            submitForm() {
                const formAsJs = this.serializeFormAsJS(this.users);
                const formAsXml = x2js.js2xml(formAsJs);

                const urlEncoded = new URLSearchParams();
                urlEncoded.append('XML', formAsXml);

                fetch('/ugd/submit/simpleSubmit.action?action=USERMAN$APP$FORM$CONNECT_V2', {
                    body: urlEncoded,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then(response => response.json()).then(json => {
                    if (json.status === 'success') {
                        if (window.confirm('Заявка успешно отправлена. Желаете закрыть форму?'))
                            window.opener.close();
                    }
                });
            },

            onPersonSelected(selectedData, user) {
                const userData = selectedData.selected[0].extraFields;

                user.info.lastName = userData.lastname;
                user.info.firstName = userData.firstname;
                user.info.middleName = userData.middlename;
                user.info.organisation = userData.organisation;
                user.info.position = userData.position;
                user.info.email = userData.email;
                user.info.phone = userData.phone;
                user.info.roomNumber = userData.roomnumber;
                user.info.address = userData.address;
            },

            onPersonRemoved(user) {
                user.info.lastName = '';
                user.info.firstName = '';
                user.info.middleName = '';
                user.info.organisation = '';
                user.info.position = '';
                user.info.email = '';
                user.info.phone = '';
                user.info.roomNumber = '';
                user.info.address = '';
                user.info.requireConsultation = false;
            },
        },
        computed: {
            canSubmit() {
                return this.users.every(user =>
                    user.info.lastName
                    && user.info.firstName
                    && user.info.middleName
                    && user.info.organisation
                    && user.info.position
                    && (user.info.SUDIRlogin.selected.length || user.info.SUDIRlogin.input),
                ) && this.users.length;
            },
        },
        data: () => ({
            ui: { collapsedPermissionTypes: [false, false] },
            initialData: {
                emptyUser: {
                    info: {
                        SUDIRlogin: {
                            input: '',
                            selected: [],
                        },
                        lastName: '',
                        firstName: '',
                        middleName: '',
                        organisation: '',
                        position: '',
                        email: '',
                        phone: '',
                        roomNumber: '',
                        address: '',
                        requireConsultation: {
                            value: false,
                        },
                    },
                    basicPermissions: {
                        types: [
                            {
                                id: 0,
                                title: 'Роли пользователя',
                                xmlTag: 'GRANT',
                                options: [
                                    {
                                        id: 0,
                                        title: 'просмотр',
                                        className: 'read',
                                        xmlString: 'view',
                                    },
                                    {
                                        id: 1,
                                        title: 'редактирование',
                                        className: 'edit',
                                        xmlString: 'edit',
                                    },
                                ],
                            },
                            {
                                id: 1,
                                title: 'Отключить пользователю',
                                xmlTag: 'REVOKE',
                                options: [
                                    {
                                        id: 0,
                                        title: 'просмотр',
                                        className: 'read',
                                        xmlString: 'view',
                                    },
                                    {
                                        id: 1,
                                        title: 'редактирование',
                                        className: 'edit',
                                        xmlString: 'edit',
                                    },
                                ],
                            },
                        ],
                        groups: [],
                    },
                    additionalPermissions: [],
                    rationale: '',
                },
            },
            formDetails: [],
            users: [],
        }),
        mounted() {
            fetch('/ugd/getCardHtml.action?cardId=USERMAN$APP$FORM$CONNECT$NEW$VIEW')
                .then(response => response.text())
                .then(string => (new window.DOMParser()).parseFromString(string, 'text/xml'))
                .then(xml => this.loadInitialDataFromXML(xml.querySelector('XML')))
                .then(() => this.addNewUser());
        },
    };
</script>

<style>
    body {
        background-color: var(--portal-alt-bg);
    }
</style>

<style scoped>
    .form-container,
    .form-title,
    .form,
    .as-block,
    .block-title,
    .block-content,
    .data-line,
    .title,
    .value,
    .users-container,
    .user,
    .user-header,
    .expander,
    .collapser,
    .user-header > .title,
    .user-header > .remove-button,
    .user-data-container,
    .user-info,
    .info-element,
    .element-title,
    .element-content,
    .user-settings,
    .settings-block,
    .settings-block-title,
    .settings-block-content,
    .permissions-types,
    .permission-type,
    .type-name,
    .type-options,
    .type-option,
    .permissions-groups,
    .permissions-group,
    .group-header,
    .group-title,
    .group-permissions,
    .permission,
    .permission-title,
    .permission-checkbox-groups,
    .permission-checkbox-group,
    .checkbox-wrapper,
    .actions,
    .as-button,
    .submit-button {
        display: flex;
    }

    .form-container {
        width: 900px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 30px;
        margin: 0 auto;
        margin-bottom: 50px;
    }

    .form-title {
        font-size: 24px;
        margin-bottom: 20px;
    }

    .form {
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    .as-block {
        box-sizing: border-box;
        border: 1px solid #e7e8ec;
        border-radius: 5px;
        flex-direction: column;
        background-color: white;
        width: 100%;
    }

    .as-block#details {
        padding: 15px 0 20px 40px;
        height: 145px;
        margin-bottom: 10px;
    }

    .as-block#details > .block-title {
        margin-bottom: 10px;
    }

    .as-block#details > .block-content {
        justify-content: space-around;
        height: 100%;
    }

    .as-block#users {
        padding: 15px 15px 50px 15px;
    }

    .as-block#users > .block-title {
        margin-left: 30px;
        margin-bottom: 15px;
    }

    .as-block#users > .block-content {

    }

    .block-title {
        font-size: 19px;
        font-weight: 600;
    }

    .block-content {
        flex-direction: column;
    }

    .data-line {
        font-size: 14px;
    }

    .data-line > .title {
        color: #90a4ae;
        width: 150px;
        justify-content: flex-end;
        margin-right: 10px;
    }

    .data-line > .title:after {
        content: ':';
    }

    .data-line > .value {
    }

    .users-container {
        flex-direction: column;
        background-color: #fafbfc;
    }

    .user {
        flex-direction: column;
        margin-bottom: 2px;
    }

    .user-header {
        height: 35px;
        align-items: center;
        background-color: var(--portal-alt-bg);
        border-radius: 3px;
    }

    .expander {
        height: 18px;
        width: 18px;
        cursor: pointer;
        user-select: none;
        transition: transform .2s;
        margin: 0 8px;
        flex-shrink: 0;
    }

    .expander > svg {
        height: 100%;
        width: 100%;
        fill: #626262;
        transition: fill .2s;
    }

    .expander:hover > svg {
        fill: #0072ff
    }

    .expander.expanded,
    .user.expanded > .user-header > .expander,
    .permissions-group.expanded > .permission.main > .expander {
        transform: rotate(90deg);
    }

    .user-header > .title {
        font-weight: 600;
        font-size: 15px;
        width: 100%;
        cursor: pointer;
        height: 19px;
    }

    .user-header > .remove-button {
        height: 12px;
        width: 12px;
        cursor: pointer;
        user-select: none;
        margin: 0 10px;
    }

    .user-header > .remove-button > svg {
        height: 100%;
        width: 100%;
        fill: #626262;
        transition: fill .2s;
    }

    .user-header > .remove-button:hover > svg {
        fill: #d94f4f;
    }

    .user-data-container {
        flex-direction: column;
        max-height: 0;
        overflow: hidden;
        padding: 0 20px;
    }

    .user.expanded > .user-data-container {
        max-height: 5000px;
        padding: 20px;
    }

    .user-info {
        flex-wrap: wrap;
        margin-bottom: 40px;
        padding: 0 15px;
        flex-shrink: 0;
    }

    .info-element {
        align-items: center;
        margin-bottom: 15px;
    }

    .info-element > .element-title {
        font-size: 15px;
        margin-right: 10px;
        flex-shrink: 0;
        width: 100px;
        justify-content: flex-end;
    }

    .info-element > .element-content {
        flex-grow: 1;
        height: 30px;
    }

    .user-settings {
        flex-direction: column;
        flex-shrink: 0;
    }

    .settings-block {
        flex-direction: column;
    }

    .settings-block:not(:first-child) {
        margin-top: 40px;
    }

    .settings-block-title {
        font-size: 19px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .settings-block-content {
        flex-direction: column;
    }

    .settings-block#rationale textarea {
        resize: vertical;
        min-height: 84px;
        box-sizing: border-box;
        border: 1px solid #e4e4e4;
        border-radius: 3px;
        outline: none;
        padding: 5px;
        font-family: 'PTsans', monospace;
        max-height: 400px
    }

    .settings-block#rationale textarea:hover,
    .settings-block#rationale textarea:focus {
        border-color: #41a3e0;
    }

    .permissions-types {
        font-size: 11px;
        margin-left: auto;
        margin-bottom: 20px;
    }

    .permissions-types > .collapser {
        width: 20px;
        height: 33px;
        cursor: pointer;
        transition: 0.3s;
        justify-content: flex-end;
        user-select: none;
    }

    .permissions-types > .collapser.collapsed > svg {
        transform: rotate(180deg);
    }

    .permissions-types > .collapser > svg {
        height: 100%;
        width: 8px;
        fill: #626262;
        transition: all .2s;
    }

    .permissions-types > .collapser:hover > svg {
        fill: #0072ff;
    }

    .permission-type {
        flex-direction: column;
        overflow: hidden;
        max-width: 300px;
        height: 33px;
    }

    .permission-type.collapsed {
        margin-left: 0;
        max-width: 0;
    }

    .type-name {
        font-weight: 600;
        justify-content: center;
        margin-bottom: 5px;
        flex-shrink: 0;
    }

    .type-options {
        flex-shrink: 0;
    }

    .type-option {
        justify-content: center;
    }

    .permission-checkbox-group > .checkbox-wrapper {
        justify-content: center;
    }

    .type-option.read,
    .checkbox-wrapper.read {
        width: 70px;
    }

    .type-option.edit,
    .checkbox-wrapper.edit {
        width: 80px;
    }

    .permissions-groups {
        flex-direction: column;
        font-size: 13px;
        margin-right: 20px;
    }

    .permissions-group {
        flex-direction: column;
    }

    .group-header {
        align-items: center;
    }

    .group-title {
    }

    .group-permissions {
        flex-direction: column;
    }

    .permission {
        width: 100%;
        align-items: center;
        overflow: hidden;
    }

    .permission:not(.main) {
        max-height: 0;
    }

    .permission.main {
        cursor: pointer;
        min-height: 32px;
        user-select: none;
    }

    .permissions-group.expanded > .permission.main > {

    }

    .permissions-group.expanded > .permission.main ~ .permission {
        max-height: 100px;
    }

    .permission-title {
        flex-basis: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .permission.main > .permission-title {
        font-weight: 600;
        user-select: text;
    }

    .permission:not(.main) > .permission-title {
        padding-left: 45px;
    }

    .permission-checkbox-groups {
    }

    .permission-checkbox-groups > .permission-checkbox-group:not(:first-child),
    .permissions-types > .permission-type:not(:first-child) {
        margin-left: 30px;
    }

    .permission-checkbox-group {
        max-width: 1000px;
        overflow: hidden;
    }

    .permission-checkbox-group.collapsed {
        margin-left: 0;
        max-width: 0;
    }

    .settings-block#additional-permissions .checkbox-wrapper:not(:first-child) {
        margin-top: 10px;
    }

    .actions {
        justify-content: center;
        margin-top: 20px;
    }

    .actions > *:not(:first-child) {
        margin-left: 12px;
    }

    .actions > .as-button.add-new-user,
    .actions > .as-button.add-new-user-with-same-permissions {
        height: 37px;
    }

    .actions > .add-new-user {
        color: white;
        width: 220px;
    }

    .actions > .add-new-user-with-same-permissions {
        font-size: 13px;
        width: 284px;
        color: #235dc1;
    }

    .submit-button {
        box-shadow: 0 10px 25px rgba(32, 116, 186, 0.4);
        width: 283px;
        height: 51px;
        color: white;
        margin-top: 40px;
        transition: all 0.3s;
    }

    .submit-button.locked {
        filter: grayscale(100%);
        cursor: not-allowed;
    }

    .as-button {
        box-sizing: border-box;
        border: 1px solid #0075be;
        border-radius: 3px;
        transition: .1s;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .as-button:hover {
        background-color: #0072ff;
        color: white;
    }

    .as-blue-button {
        background-color: #2074ba;
    }

    .user-info-input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #d3d9de;
        border-radius: 3px;
        height: 30px;
        background-color: white;
        align-items: center;
        padding-left: 10px;
        display: flex;
        transition: border-color .2s;
        outline: none;
    }

    .user-info-input:hover {
        border-color: #0087be;
    }

    .user-info-input.focused {
        border-color: #0087be;
    }

</style>
